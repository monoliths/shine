class AddLowerIndexToCustomers < ActiveRecord::Migration[5.0]
  def change
    add_index :customers, "lower(last_name) varchar_pattern_ops"
    add_index :customers, "lower(first_name) varchar_pattern_ops"
    # Dont need operator class on email becasue we will search for exact matches
    # when it comes to email
    add_index :customers, "lower(email)"
  end
end
