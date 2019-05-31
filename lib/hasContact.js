function hasContact(event, contact) {
    var check_contacts;
    var entity_contacts;

    if (event.check.labels.hasOwnProperty("contacts")) {
        check_contacts = event.check.labels.contacts.split(",");
        console.log("found check contact label")
    }

    if (event.entity.labels.hasOwnProperty("contacts")) {
        entity_contacts = event.entity.labels.contacts.split(",");
        console.log("found entity contact label")
    }

    if (check_contacts.indexOf(contact) >= 0) {
        console.log("matched check contacts")
        return true;
    }
    if (entity_contacts.indexOf(contact) >= 0) {
        console.log("matched entity contacts")
        return true;
    }

    console.log("did not match any contacts")
    return false;
}