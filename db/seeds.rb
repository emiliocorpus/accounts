# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Record.create(title:"Groceries",amount:-100,date:Date.today)
Record.create(title:"Kevin's Venmo",amount:13.24,date:Date.today)
Record.create(title:"Gas",amount:-39.99,date:Date.today)
Record.create(title:"7/11 Scratcher",amount:25,date:Date.today)