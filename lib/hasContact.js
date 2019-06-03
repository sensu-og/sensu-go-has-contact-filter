function hasContact(event, contact) {
    var check_contacts = [];
    var entity_contacts = [];

    if (event.check.labels.hasOwnProperty("contacts")) {
        check_contacts = event.check.labels.contacts.split(",");
    }

    if (event.entity.labels.hasOwnProperty("contacts")) {
        entity_contacts = event.entity.labels.contacts.split(",");
    }

    // if there are no contacts, the event is not allowed
    if (check_contacts.length == 0 && entity_contacts.length == 0) {
        return false;
    }

    // allow the event if contact is present in check contacts
    if (check_contacts.indexOf(contact) >= 0) {
        return true;
    }
    //  allow the event if contact is present in entity contacts
    else if (entity_contacts.indexOf(contact) >= 0) {
        return true;
    // otherwise event is not allowed
    } else {
        return false;
    }
}