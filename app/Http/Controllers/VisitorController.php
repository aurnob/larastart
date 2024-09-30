<?php

namespace App\Http\Controllers;

use Illuminate\Validation\Rule;
use App\Enums\EntryType;
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
}
