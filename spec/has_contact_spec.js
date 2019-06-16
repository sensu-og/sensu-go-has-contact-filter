describe("has_contact", function() {
    it("returns false when event has no labels", function() {
        var event = {}

        expect(has_contact(event,"")).toBe(false);
    });

    it("returns false when event has only some labels", function() {
        var event = {
            check: {},
            entity: {
                labels: {}
            }
        };

        expect(has_contact(event,"")).toBe(false);
    });

    it("returns false when check and entity labels are empty", function() {
        var event = {
            check: {
                labels: {}
            },
            entity: {
                labels: {}
            }
        };

        expect(has_contact(event, "")).toBe(false);
    });

    it("returns true when check contacts match exactly", function() {
        var contact = "foo"
        var event = {
            check: {
                labels: {
                    contacts: contact
                }
            }
        };

        expect(has_contact(event, contact)).toBe(true);
    });

    it("returns true when check contacts values contains a match", function() {
        var contact = "bar"
        var event = {
            check: {
                labels: {
                    contacts: `foo,${contact},baz`
                }
            }
        };

        expect(has_contact(event, contact)).toBe(true);
    });

    it("returns true when entity contacts match exactly", function() {
        var contact = "foo"
        var event = {
            entity: {
                labels: {
                    contacts: contact
                }
            }
        };

        expect(has_contact(event, contact)).toBe(true);
    });

    it("returns true when check contacts values contains a match", function() {
        var contact = "bar"
        var event = {
            entity: {
                labels: {
                    contacts: `foo,${contact},baz`
                }
            }
        };

        expect(has_contact(event, contact)).toBe(true);
    });
});