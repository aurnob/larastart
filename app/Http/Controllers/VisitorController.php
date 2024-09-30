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
        $request->validate([
            'registration_code' => 'required|string|max:255',
            'entry_type' => ['required', Rule::in(array_column(EntryType::cases(), 'value'))],
        ]);

        $visitor = Visitor::where('registration_code', $request->registration_code)->first();

        if (!$visitor) {
            return response()->json(['error' => 'Visitor not found'], 404);
        }

        $entryType = EntryType::from($request->entry_type);

        $entryExists = Entry::where('visitor_id', $visitor->id)
            ->where('entry_type', $entryType)
            ->first();

        if ($entryExists) {
            $visitorEntry =  Visitor::with(['entries' => function ($query) use ($request) {
                $query->where('entry_type', $request->entry_type);
            }])
                ->where('registration_code', $request->registration_code)
                ->get();

            return response()->json(['error' => 'Entry already exists for this QR code and entry type.', 'data' => $visitorEntry], 400);
        }

        // Create a new entry record
        $create = Entry::create([
            'visitor_id' => $visitor->id,
            'entry_type' => $entryType,
            'entry_time' => Carbon::now()->setTimezone(config('app.timezone')),
        ]);

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

        return response()->json([
            'attendees' => $attendees,
            'faculty' => $faculty,
            'delegates' => $delegates,
            'snacks' => $snacks,
            'lunch' => $lunch,
            'dinner' => $dinner,
        ]);
    }
}
