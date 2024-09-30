<?php

namespace App\Enums;

enum EntryType: string
{
    case VenueEntry = 'venue_entry';
    case Snacks = 'snacks';
    case Lunch = 'lunch';
    case Dinner = 'dinner';
}
