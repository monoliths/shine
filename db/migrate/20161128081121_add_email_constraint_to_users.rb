class AddEmailConstraintToUsers < ActiveRecord::Migration[5.0]
  # NOTE: Rails ActiveRecord::Migration::CommandRecorder does not have the DSL for
  # CHECK Constraints, with that in mind set
  # config.active_record.schema_format = :sql in config/application.rb
  # So db/schema.rb is stored in sql rather than the rails specific DSL
  def up
    # the '~*' operator is how postgres does regular expressions
    execute %{
      ALTER TABLE
        users
      ADD CONSTRAINT
        email_must_be_company_email
      CHECK ( email ~* '^[^@]+@example\\.com' )
    }
  end

  def down
    execute %{
      ALTER TABLE
        users
      DROP CONSTRAINT
        email_must_be_company_email
    }
  end
end
