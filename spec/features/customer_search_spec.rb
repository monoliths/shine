require 'rails_helper'

feature "Customer Search" do
  # Helper for creating customers that will fill the test DB
  def create_customer(first_name:, last_name:, email: nil)
    username = "#{Faker::Internet.user_name}#{rand(1000)}"
    email ||= "#{username}#{rand(1000)}@#{Faker::Internet.domain_name}"
    Customer.create!(first_name: first_name,
                      last_name: last_name,
                      username: username,
                      email: email)
  end

  # Information for the User that will be searching for customers
  let(:email) { "pat@example.com" }
  let(:password) { "password123" }

  # perform actions and set behaviors before running the tests
  before do
    User.create!(email: email, password: password, password_confirmation: password)
    create_customer(first_name: "Chris", last_name: "Aaron")
    create_customer(first_name: "Pat", last_name: "Johnson")
    create_customer(first_name: "I.T.", last_name: "Pat")
    create_customer(first_name: "Patricia", last_name: "Dobbs")
    create_customer(first_name: "Pat", last_name: "Jones", email: "pat123@somewhere.net")

    # visit the correct page and log in before performing the tests
    visit "/customers"
    fill_in "Email", with: email
    fill_in "Password", with: password
    click_button "Log in"
  end

  scenario "Search by Name" do
    # Search entry is within the search-form tags
    within "section.search-form" do
      fill_in "keywords", with: "pat"
    end

    # Search results are within the search-results tags
    within "section.search-results" do
      expect(page).to have_content("Results")
      # Expect 4 items in the results
      expect(page.all("ol li.list-group-item").count).to eq(4)

      # Expect the first item on the list to be "Patricia Dobbs"
      expect(page.all("ol li.list-group-item")[0]).to have_content("Patricia")
      expect(page.all("ol li.list-group-item")[0]).to have_content("Dobbs")

      # Expect te last item on the list to be "I.T. Pat"
      expect(page.all("ol li.list-group-item")[3]).to have_content("I.T.")
      expect(page.all("ol li.list-group-item")[3]).to have_content("Pat")
    end
  end

  scenario "Search by email" do
    # Search entry is within the search-form tags
    within "section.search-form" do
      fill_in "keywords", with: "pat123@somewhere.net"
    end

    # Search results are within the search-results tags
    within "section.search-results" do
      expect(page).to have_content("Results")
      # Expect 4 items in the results
      expect(page.all("ol li.list-group-item").count).to eq(4)

      # Expect the first item on the list to be "Patricia Dobbs"
      expect(page.all("ol li.list-group-item")[0]).to have_content("Pat")
      expect(page.all("ol li.list-group-item")[0]).to have_content("Jones")

      expect(page.all("ol li.list-group-item")[1]).to have_content("Patricia")
      expect(page.all("ol li.list-group-item")[1]).to have_content("Dobbs")
      
      # Expect te last item on the list to be "I.T. Pat"
      expect(page.all("ol li.list-group-item")[3]).to have_content("I.T.")
      expect(page.all("ol li.list-group-item")[3]).to have_content("Pat")
    end
  end
end
