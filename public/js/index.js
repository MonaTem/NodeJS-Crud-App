var vm = new Vue({
    el: '#app',
    data: {
        people: [],
        person: {
            id: '',
            firstName: '',
            lastName: '',
            age: ''
        },
        modalTitle: '',
        updatePerson: false
    },

    mounted: function () {
        var self = this
        $.get('/getPeople', function (results) {
            self.people = results
        })
    },

    methods: {
        updateBtn: function (p) {
            this.person.firstName = p.FirstName
            this.person.lastName = p.LastName
            this.person.age = p.Age
            this.person.id = p.Id
            this.updatePerson = true
            this.modalTitle = 'Update Person'
            $('#modal').modal()
        },

        createPersonBtn: function () {
            var self = this
            Object.keys(this.person).map(function (key, index) {
                self.person[key] = ''
            });
            this.updatePerson = false
            this.modalTitle = 'New Person'
            $('#modal').modal()
        },

        deletePersonBtn: function (id) {
            var self = this
            $.post('/deletePerson', { id: id }, function () {
                window.location.reload()
            })
        },
    }
})