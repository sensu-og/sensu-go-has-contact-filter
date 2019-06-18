function no_contacts(event) {
    if (event.hasOwnProperty("check") && event.check.hasOwnProperty("labels") && event.check.labels.hasOwnProperty("contacts")) {
        return false;
    }
    else if (event.hasOwnProperty("entity") && event.entity.hasOwnProperty("labels") && event.entity.labels.hasOwnProperty("contacts")) {
        return false;
    } else {
        return true;
    }
}