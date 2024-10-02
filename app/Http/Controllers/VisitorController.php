<?php

namespace App\Http\Controllers;

use Illuminate\Validation\Rule;
use App\Enums\EntryType;
use App\Enums\VisitorType;
use App\Models\Visitor;
use App\Models\Entry;
use Carbon\Carbon;
use Illuminate\Http\Request;

class VisitorController extends Controller
{
    public function scanEntry(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'registration_code' => 'required|string|max:255',
            'entry_type' => ['required', Rule::in(array_column(EntryType::cases(), 'value'))],
        ]);

        // Find the visitor by registration code
        $visitor = Visitor::where('registration_code', $request->registration_code)->first();

        if (!$visitor) {
            return response()->json(['error' => 'Visitor not found'], 404);
        }

        // Get the entry type from the request
        $entryType = EntryType::from($request->entry_type);

        // Get today's date
        $todayDate = Carbon::now()->toDateString();

        // Check if an entry already exists for the visitor, entry type, and today's date
        $entryExists = Entry::where('visitor_id', $visitor->id)
            ->where('entry_type', $entryType)
            ->where('entry_date', $todayDate)  // Ensure the entry is unique for the day
            ->first();

        if ($entryExists) {
            // Return error if an entry already exists for this visitor for the day
            $visitorEntry = Visitor::with(['entries' => function ($query) use ($request) {
                $query->where('entry_type', $request->entry_type);
            }])
                ->where('registration_code', $request->registration_code)
                ->get();

            return response()->json(['error' => 'Entry already exists for this QR code and entry type for today.', 'data' => $visitorEntry], 400);
        }

        // Create a new entry record
        $create = Entry::create([
            'visitor_id' => $visitor->id,
            'entry_type' => $entryType,
            'entry_time' => Carbon::now()->setTimezone(config('app.timezone')),
            'entry_date' => $todayDate,  // Add the date component to enforce the one-entry-per-day rule
        ]);

        // Return a success response
        return response()->json(['success' => 'Entry recorded successfully.', 'visitor' => $visitor, 'entries' => $create]);
    }

    public function getStats()
    {
        // Total attendees who have made a venue entry
        $attendees = Entry::where('entry_type', 'venue_entry')
            ->distinct('visitor_id')
            ->count();

        // Total faculty (visitor_type = 'faculty')
        $faculty = Visitor::where('visitor_type', VisitorType::Faculty)
            ->whereHas('entries', function ($query) {
                $query->where('entry_type', EntryType::VenueEntry);
            })
            ->count();

        // Total delegates (visitor_type = 'delegate')
        $delegates = Visitor::where('visitor_type', VisitorType::Delegate)
            ->whereHas('entries', function ($query) {
                $query->where('entry_type', EntryType::VenueEntry);
            })
            ->count();

        // Total snacks entries
        $snacks = Entry::where('entry_type', 'snacks')
            ->distinct('visitor_id')
            ->count();

        // Total lunch entries
        $lunch = Entry::where('entry_type', 'lunch')
            ->distinct('visitor_id')
            ->count();

        // Total dinner entries
        $dinner = Entry::where('entry_type', 'dinner')
            ->distinct('visitor_id')
            ->count();

        // Total kit entries
        $kit = Entry::where('entry_type', 'kit')
            ->distinct('visitor_id')
            ->count();

        return response()->json([
            'attendees' => $attendees,
            'faculty' => $faculty,
            'delegates' => $delegates,
            'snacks' => $snacks,
            'lunch' => $lunch,
            'dinner' => $dinner,
            'kit' => $kit,
        ]);
    }
}
