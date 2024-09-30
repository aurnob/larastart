<?php

namespace App\Enums;

enum VisitorType: string
{
    case Delegate = 'delegate';
    case Faculty = 'faculty';
    case Invitee = 'invitee';
    case Organizer = 'organizer';
    case Volunteer = 'volunteer';
}
