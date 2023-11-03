import { Component, ChangeEvent, FormEvent } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import "../../styles/subscription-form.css";

interface SubscriptionFormState {
  email: string;
}

class SubscriptionForm extends Component<{}, SubscriptionFormState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      email: "",
    };
  }

  handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value });
  };

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // You can send the email to your server for processing here
    // Example: Use Axios or the fetch API to make a POST request

    console.log("Email submitted:", this.state.email);

    // Clear the input field
    this.setState({ email: "" });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <InputGroup>
          <Button
            className="subscription-form-btn"
            variant="info"
            type="submit"
          >
            Subscribe
          </Button>
          <FormControl
            className="subscription-input-group"
            type="email"
            placeholder="E-mail Address"
            required
          />
        </InputGroup>
      </Form>
    );
  }
}

export default SubscriptionForm;
