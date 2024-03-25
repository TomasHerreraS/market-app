import { useEffect, useRef, useState } from "react";
import {
  Button,
  CloseButton,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Stack,
} from "react-bootstrap";
import * as yup from "yup";
import {
  addUser,
  getCheckExists,
} from "../../provider/user.provider";
import { UserData } from "../../utils/type";
import "../../styles/admin-user-form.css";

interface FormProp {
  onHide: any;
}

const AdminUserForm = ({ onHide }: FormProp) => {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<number>();
  const [stateInput, setStateInput] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [cityInput, setCityInput] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [user, setUser] = useState<UserData>();
  const [showCity, setShowCity] = useState<boolean>(false);
  const [showState, setShowState] = useState<boolean>(false);
  const [cityOptions, setCityOptions] = useState<string[]>(["Seattle"]);
  const [stateOptions, setStateOptions] = useState<string[]>(["WA"]);
  const stateInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const [phoneExistsError, setPhoneExistsError] = useState<boolean>(false);
  const [emailExistsError, setEmailExistsError] = useState<boolean>(false);
  const [firstRender, setFirstRender] = useState<boolean>(true);

  const schema = yup.object().shape({
    firstname: yup
      .string()
      .min(3, "First name must be at least 3 characters long")
      .required("First name is a required field"),
    lastname: yup
      .string()
      .min(3, "Last name must be at least 3 characters long")
      .required("Last name is a required field"),
    email: yup
      .string()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email must be valid"
      )
      .required("Email is a required field"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is a required field"),
    role: yup.number().required("Role is a required field"),
    phone: yup.string().required("Phone is a required field"),
    cityInput: yup.string().required("City is a required field"),
    stateInput: yup.string().required("State is a required field"),
    address: yup.string().required("Address is a required field"),
  });

  const handleCityShow = () => {
    setShowCity(true);
  };
  const handleStateShow = () => {
    setShowState(true);
  };

  const handleClose = () => {
    onHide();
  };

  useEffect(() => {
    const handleClickState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        stateInputRef.current &&
        !stateInputRef.current.contains(e.target as Node) &&
        target.getAttribute("name") !== "state"
        ) {
        setShowState(false);
      }
    };

    document.addEventListener("mousedown", handleClickState);

    return () => {
      document.removeEventListener("mousedown", handleClickState);
    };
  }, []);

  useEffect(() => {
    const handleClickCity = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        cityInputRef.current &&
        !cityInputRef.current.contains(e.target as Node) &&
        target.getAttribute("name") !== "city"
        ) {
        setShowCity(false);
      }
    };

    document.addEventListener("mousedown", handleClickCity);

    return () => {
      document.removeEventListener("mousedown", handleClickCity);
    };
  }, []);

  const handleInput = (e: any) => {
    if ("target" in e) {
      const { name, value } = e.target;
      switch (name) {
        case "firstname":
          setFirstname(value);
          break;
        case "lastname":
          setLastname(value);
          break;
        case "email":
          setEmail(value);
          break;
        case "password":
          setPassword(value);
          break;
        case "role":
          setRole(parseInt(value));
          break;
        case "city":
          setCityInput(value);
          break;
        case "state":
          setStateInput(value);
          break;
        case "address":
          setAddress(value);
          break;
        case "phone":
          const phoneValue = value.replace(/\D/g, "");
          let formattedValue = "";

          if (phoneValue.length <= 10) {
            if (phoneValue.length > 3) {
              formattedValue = `(${phoneValue.slice(0, 3)}) `;
              if (phoneValue.length > 6) {
                formattedValue += `${phoneValue.slice(3, 6)}-${phoneValue.slice(
                  6,
                  10
                )}`;
              } else {
                formattedValue += phoneValue.slice(3);
              }
            } else {
              formattedValue = phoneValue;
            }
            setPhone(formattedValue);
          }
          break;
      }
    }
  };

  const selectState = (value: string) => {
    setStateInput(value)
    setShowState(false)
  }

  const selectCity = (value: string) => {
    setCityInput(value)
    setShowCity(false)
  }

  useEffect(() => {
    if(!firstRender){
      const addUserIfUserExists = async () => {
        if (user) {
          try {
            await addUser(user);
          } catch (error) {
            console.log(error);
          }
        }
      }
      if (!emailExistsError && !phoneExistsError) {
        addUserIfUserExists();
        window.location.reload()
      }
    } else {
      setFirstRender(false)
    }
  }, [user]);
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const dataExists = await getCheckExists(phone, email);

    if (dataExists.phone) {
      setPhoneExistsError(true);
    } else {
      setPhoneExistsError(false);
    }

    if (dataExists.email) {
      setEmailExistsError(true);
    } else {
      setEmailExistsError(false);
    }
    try {
      await schema.validate(
        {
          role,
          email,
          lastname,
          firstname,
          password,
          address,
          cityInput,
          stateInput,
          phone,
        },
        { abortEarly: false }
        );
        if (firstname && lastname && password && role && email) {
          setUser({
            firstname: firstname,
            lastname: lastname,
          password: password,
          email: email,
          role_id: role,
          phone: phone,
          state: stateInput,
          city: cityInput,
          address: address,
        });
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setValidationErrors(error.errors);
      }
    }
  };

  return (
    <>
      <Container className="user-list-form-add-users">
        <Form onSubmit={handleSubmit}>
          <Stack direction="horizontal" className="justify-content-end">
            <CloseButton onClick={handleClose} />
          </Stack>
          <h2 className="text-center">Add User Form</h2>
          <Form.Group className="my-2">
            <Form.Label>Name:</Form.Label>
            <InputGroup>
              <Form.Control
                type="name"
                id="firstname"
                name="firstname"
                placeholder="Enter first name"
                value={firstname}
                onChange={handleInput}
              />
              <Form.Control
                type="name"
                id="lastname"
                name="lastname"
                placeholder="Enter last name"
                value={lastname}
                onChange={handleInput}
              />
            </InputGroup>
            <Form.Text id="name" muted>
              Each name must be at least 3 characters long.
            </Form.Text>
            {validationErrors
              .filter(
                (error) => error.includes("Last") || error.includes("First")
              )
              .map((error, index) => (
                <p className="errors" key={index}>
                  - {error}
                </p>
              ))}
          </Form.Group>
          <Form.Group>
            <Form.Label className="d-flex">
              <div className="location-label">State:</div>
              <div className="location-label">City:</div>
            </Form.Label>
            <InputGroup>
              <Form.Control
                name="state"
                id="state"
                placeholder="Select state"
                autoComplete="disabled"
                onClick={handleStateShow}
                value={stateInput}
                onChange={handleInput}
              />
              {showState && (
                <Dropdown.Menu
                  show
                  className="state-options"
                  ref={stateInputRef}
                >
                  {stateOptions
                    .filter((state) =>
                      state.toLowerCase().includes(stateInput.toLowerCase())
                    )
                    .map((state, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => selectState(state)}
                      >
                        {state}
                      </Dropdown.Item>
                    ))}
                  {stateOptions.filter((state) =>
                    state.toLowerCase().includes(stateInput.toLowerCase())
                  ).length === 0 && (
                    <Dropdown.Item disabled>No Results Found</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              )}
              <Form.Control
                name="city"
                id="city"
                placeholder="Enter city"
                autoComplete="disabled"
                onClick={handleCityShow}
                value={cityInput}
                onChange={handleInput}
              />
              {showCity && (
                <Dropdown.Menu show className="city-options" ref={cityInputRef}>
                  {cityOptions
                    .filter((city) =>
                      city.toLowerCase().startsWith(cityInput.toLowerCase())
                    )
                    .map((city, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => selectCity(city)}
                      >
                        {city}
                      </Dropdown.Item>
                    ))}
                  {cityOptions.filter((city) =>
                    city.toLowerCase().startsWith(cityInput.toLowerCase())
                  ).length === 0 && (
                    <Dropdown.Item disabled>No Results Found</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              )}
            </InputGroup>
          </Form.Group>
          <div className="d-flex">
            {validationErrors
              .filter(
                (error) => error.includes("State") || error.includes("City")
              )
              .map((error, index) => (
                <p className="errors" key={index}>
                  - {error}
                </p>
              ))}
          </div>
          <Form.Group>
            <Form.Label>Address:</Form.Label>
            <Form.Control
              placeholder="Enter Address"
              name="address"
              id="address"
              value={address}
              onChange={handleInput}
            />
          </Form.Group>
          {validationErrors
            .filter((error) => error.includes("Address"))
            .map((error, index) => (
              <p className="errors" key={index}>- {error}</p>
            ))}
          <Form.Group className="my-2">
            <Form.Label>E-mail:</Form.Label>
            <Form.Control
              type="name"
              id="email"
              name="email"
              placeholder="Enter e-mail"
              value={email}
              onChange={handleInput}
            />
            {validationErrors
              .filter((error) => error.includes("Email"))
              .map((error, index) => (
                <p className="errors" key={index}>
                  - {error}
                </p>
              ))}
            {emailExistsError && (
              <p className="errors">- Email already exists</p>
            )}
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label htmlFor="inputPassword5">Password:</Form.Label>
            <Form.Control
              type="password"
              id="inputPassword5"
              name="password"
              value={password}
              aria-describedby="passwordHelpBlock"
              placeholder="Enter password"
              onChange={handleInput}
            />
            <Form.Text id="passwordHelpBlock" muted>
              Password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces, special characters, or
              emoji.
            </Form.Text>
            {validationErrors
              .filter((error) => error.includes("Password"))
              .map((error, index) => (
                <p className="errors" key={index}>
                  - {error}
                </p>
              ))}
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Phone:</Form.Label>
            <Form.Control
              name="phone"
              id="phone"
              placeholder="ex. (123)-123-1234"
              value={phone}
              onChange={handleInput}
            />
          </Form.Group>
          {validationErrors.filter((error) => error.includes("Phone")).map((error, index) => (
            <p className="errors">- {error}</p>
          ))}
          {phoneExistsError && <p className="errors">- Phone already exists</p>}
          <Form.Group className="my-2">
            <Form.Label>Role:</Form.Label>
            <Form.Select
              value={role}
              id="role"
              name="role"
              onChange={handleInput}
            >
              <option>Select Role</option>
              <option value="1">Client</option>
              <option value="2">Admin</option>
              <option value="3">Super Admin</option>
            </Form.Select>
            {validationErrors
              .filter((error) => error.includes("Role"))
              .map((error, index) => (
                <p className="errors" key={index}>
                  - {error}
                </p>
              ))}
          </Form.Group>
          <div className="d-flex mt-5">
            <Button type="submit" variant="info" size="lg" className="mx-auto">
              Add User
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AdminUserForm;
