describe("no_contacts", function() {
    it("returns true when event has no labels", function() {
        var event = {}

        expect(no_contacts(event)).toBe(true);
    });

    it("returns true when event has only some of the expected labels", function() {
        var event = {
            check: {},
            entity: {
                labels: {}
            }
        };

        expect(no_contacts(event)).toBe(true);
    });

    it("returns false when event has only entity contacts", function() {
        var event = {
            check: {},
            entity: {
                labels: {
                    contacts: "foo,bar,baz"
                }
            }
        };

        expect(no_contacts(event)).toBe(false);
    });

    it("returns false when event has only check contacts", function() {
        var event = {
            check: {
                labels: {
                    contacts: "foo,bar,baz"
                }
            },
            entity: {}
        };

        expect(no_contacts(event)).toBe(false);
    });

    it("returns true when check and entity labels are empty", function() {
        var event = {
            check: {
                labels: {}
            },
            entity: {
                labels: {}
            }
        };

        expect(no_contacts(event)).toBe(true);
    });
});