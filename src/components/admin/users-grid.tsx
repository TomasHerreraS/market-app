import { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  CloseButton,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Stack,
} from "react-bootstrap";
import "../../styles/users-grid.css";
import { Users } from "../../utils/type";
import { fetchUsers } from "../../utils/api";
import UserCards from "./user-cards";
import UserSkeletons from "./user-skeletons";
import { ChevronDown } from "react-bootstrap-icons";

const UsersGrid = () => {
  // Timeout to create loading skeletons
  const DELAY_MILISECONDS = 1000;

  const skeletons = [1, 2, 3, 4, 5, 6];

  const [showForm, setShowForm] = useState<boolean>(false);
  const [users, setUsers] = useState<Users[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(true);
  const [filteredUsers, setFilteredUsers] = useState<Users[]>([]);
  const [showSort, setShowSort] = useState<boolean>(false);
  const [sortFilter, setSortFilter] = useState<string>("Alphabetical");
  const [showRole, setShowRole] = useState<boolean>(false);
  const [roleFilter, setRoleFilter] = useState<string>("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    let filter = users.filter(
      (user) =>
        // If the search input is found an any of these
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.role.toLowerCase().includes(search) ||
        user.address.toLowerCase().includes(search) ||
        user.phone.toString().includes(search)
    );
    // Filtering roles
    filter = filter.filter((user) =>
      user.role.toLowerCase().includes(roleFilter)
    );

    if (sortFilter === "Alphabetical") {
      filter.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortFilter === "Newest") {
      filter.sort((a, b) => b.date.getTime() - a.date.getTime());
    }

    if (sortFilter === "Oldest") {
      filter.sort((a, b) => a.date.getTime() - b.date.getTime());
    }

    setFilteredUsers(filter);
  }, [search, roleFilter, sortFilter]);

  const handleSortEnter = () => {
    setShowSort(true);
  };

  const handleSortLeave = () => {
    setShowSort(false);
  };

  const handleRoleEnter = () => {
    setShowRole(true);
  };

  const handleRoleLeave = () => {
    setShowRole(false);
  };

  // Fetching the users
  const fetchAccount = async () => {
    try {
      const accounts = await fetchUsers();

      const user: Users[] = accounts.map((user) => ({
        ...user,
        date: new Date(user.date),
      }));

      setUsers(user);
      setFilteredUsers(user);
    } catch (error) {
      console.log("Could not fetch users", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (users.length === 0) {
        fetchAccount();
      }
    }, DELAY_MILISECONDS);

    setTimeout(() => setLoading(false), DELAY_MILISECONDS);
  }, [filteredUsers]);

  const handleForm = () => {
    setShowForm(!showForm);
  };

  const resetSearch = () => {
    setSortFilter("Alphabetical");
    setRoleFilter("");
    setSearch("");
  };

  return (
    <>
      <div className={showForm ? "darken" : ""}></div>
      <Container className="p-3 m-5 mx-auto user-list">
        <h3 className="text-center mb-4">List of Users</h3>
        <Row className="g-3 justify-content-between">
          <Col xs={12} md={5}>
            <InputGroup size="sm">
              <Form.Control
                placeholder="What user are you looking for?"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                value={search}
                onChange={handleSearch}
              />
            </InputGroup>
          </Col>
          <Col xs="auto">
            <Stack direction="horizontal" gap={3}>
              <div>
                <Button
                  variant="info"
                  size="sm"
                  onMouseEnter={handleSortEnter}
                  onMouseLeave={handleSortLeave}
                >
                  Sort <ChevronDown />
                </Button>
                {showSort && (
                  <div
                    className="user-list-filter-options"
                    onMouseEnter={handleSortEnter}
                    onMouseLeave={handleSortLeave}
                  >
                    <div
                      className={
                        sortFilter === "Alphabetical"
                          ? "user-list-selected-filter"
                          : "user-list-select-options"
                      }
                      onClick={() => setSortFilter("Alphabetical")}
                    >
                      Alphabetical
                    </div>
                    <div
                      className={
                        sortFilter === "Newest" ? "user-list-selected-filter" : "user-list-select-options"
                      }
                      onClick={() => setSortFilter("Newest")}
                    >
                      Newest
                    </div>
                    <div
                      className={
                        sortFilter === "Oldest" ? "user-list-selected-filter" : "user-list-select-options"
                      }
                      onClick={() => setSortFilter("Oldest")}
                    >
                      Oldest
                    </div>
                  </div>
                )}
              </div>
              <div>
                <Button
                  variant="info"
                  size="sm"
                  onMouseEnter={handleRoleEnter}
                  onMouseLeave={handleRoleLeave}
                >
                  Role <ChevronDown />
                </Button>
                {showRole && (
                  <div
                    className="user-list-filter-options"
                    onMouseEnter={handleRoleEnter}
                    onMouseLeave={handleRoleLeave}
                  >
                    <div
                      className={
                        roleFilter === "" ? "user-list-selected-filter" : "user-list-select-options"
                      }
                      onClick={() => setRoleFilter("")}
                    >
                      All
                    </div>
                    <div
                      className={
                        roleFilter === "admin" ? "user-list-selected-filter" : "user-list-select-options"
                      }
                      onClick={() => setRoleFilter("admin")}
                    >
                      Admin
                    </div>
                    <div
                      className={
                        roleFilter === "client" ? "user-list-selected-filter" : "user-list-select-options"
                      }
                      onClick={() => setRoleFilter("client")}
                    >
                      Client
                    </div>
                  </div>
                )}
              </div>
              <Button variant="info" size="sm" onClick={resetSearch}>
                Reset Search
              </Button>
              <Button size="sm" variant="warning" onClick={() => handleForm()}>
                Add User
              </Button>
            </Stack>
          </Col>
        </Row>

        <hr />
        <Row className="g-0">
          {isLoading &&
            skeletons.map((skeleton) => (
              <Col xs={12} sm={6} lg={3}>
                <UserSkeletons key={skeleton} />
              </Col>
            ))}
          {!isLoading && filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <Col xs={12} sm={6} lg={3}>
                <UserCards key={user.userId} users={user} />
              </Col>
            ))
          ) : (
            <h2>No Results Found</h2>
          )}
        </Row>
      </Container>
      {showForm ? (
        <>
          <Container className="user-list-form-add-users">
            <Stack direction="horizontal" className="justify-content-end">
              <CloseButton onClick={() => handleForm()} />
            </Stack>
            <Form.Label>E-mail:</Form.Label>
            <Form.Control
              type="email"
              id="email"
              placeholder="name@quantum.com"
            />
            <Form.Text id="email" muted></Form.Text>
            <br />
            <Form.Label>Username:</Form.Label>
            <Form.Control type="name" id="name" placeholder="quantum123" />
            <Form.Text id="name" muted>
              Username must be atleast 6 characters long.
            </Form.Text>
            <br />
            <Form.Label htmlFor="inputPassword5" className="mt-4">
              Password:
            </Form.Label>
            <Form.Control
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              placeholder="Password"
            />
            <Form.Text id="passwordHelpBlock" muted>
              Password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces, special characters, or
              emoji.
            </Form.Text>
            <Col className="d-flex justify-content-center mt-5">
              <Button variant="info">Add User</Button>
            </Col>
          </Container>
        </>
      ) : null}
    </>
  );
};

export default UsersGrid;
