Contact.destroy_all

Contact.create([{
                 first_name: 'Eddie',
                 last_name: 'Vedder',
                 email: 'pearljam@email.com',
                 phone_number: '622 123 999'
               },
                {
                  first_name: 'Jack',
                  last_name: 'Johnson',
                  email: 'hawaiian@email.com',
                  phone_number: '699 890 453'
                },
                {
                  first_name: 'Florence',
                  last_name: 'Welch',
                  email: 'florenceandthemachine@email.com',
                  phone_number: '633 555 443'
                },
                {
                  first_name: 'Lana',
                  last_name: 'Del Rey',
                  email: 'videogames@email.com',
                  phone_number: '611 234 909'
                }])

p "Created #{Contact.count} contacts"
