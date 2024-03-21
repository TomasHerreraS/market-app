import { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Stack,
} from "react-bootstrap";
import "../../styles/users-grid.css";
import { Role, Users } from "../../utils/type";
import UserCards from "./user-cards";
import UserSkeletons from "./user-skeletons";
import { ChevronDown } from "react-bootstrap-icons";
import { deleteUser, getAllUsers } from "../../provider/user.provider";
import AdminUserForm from "./admin-user-form";

const UsersGrid = ({ role }: Role) => {
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
  const [roleFilter, setRoleFilter] = useState<number>(0);
  const [initialRender, setInitialRender] = useState<boolean>(true);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    let filter = users.filter(
      (user) =>
        // If the search input is found an any of these
        user.firstname.toLowerCase().includes(search) ||
        user.lastname.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.address.toLowerCase().includes(search) ||
        user.phone.toString().includes(search)
    );
    // Filtering roles
    filter = filter.filter(
      (user) => user.rol_id === roleFilter || roleFilter === 0
    );

    if (sortFilter === "Alphabetical") {
      filter.sort((a, b) => a.firstname.localeCompare(b.firstname));
    }

    if (sortFilter === "Newest") {
      filter.sort((a, b) => b.date.getTime() - a.date.getTime());
    }

    if (sortFilter === "Oldest") {
      filter.sort((a, b) => a.date.getTime() - b.date.getTime());
    }

    setFilteredUsers(filter);
  }, [search, roleFilter, sortFilter, users]);

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
  const fetchUsers = async () => {
    try {
      const accounts = await getAllUsers();

      const user: Users[] = accounts.map((user) => ({
        ...user,
        date: new Date(user.date),
      }));
      setUsers(user);
    } catch (error) {
      console.log("Could not fetch users", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (users.length === 0 && initialRender) {
        fetchUsers();
        setInitialRender(false);
      }
    }, DELAY_MILISECONDS);

    setTimeout(() => setLoading(false), DELAY_MILISECONDS);
  }, [filteredUsers]);

  const handleForm = () => {
    setShowForm(!showForm);
  };

  const handleDelete = async (email: string) => {
    try {
      await deleteUser(email);
      fetchUsers();
    } catch (error) {
      throw error;
    }
  };

  const resetSearch = () => {
    setSortFilter("Alphabetical");
    setRoleFilter(0);
    setSearch("");
  };

  return (
    <>
      <div className={showForm ? "darken" : ""}></div>
      <Container className="p-3 my-5 user-list">
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
                        sortFilter === "Newest"
                          ? "user-list-selected-filter"
                          : "user-list-select-options"
                      }
                      onClick={() => setSortFilter("Newest")}
                    >
                      Newest
                    </div>
                    <div
                      className={
                        sortFilter === "Oldest"
                          ? "user-list-selected-filter"
                          : "user-list-select-options"
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
                        roleFilter === 0
                          ? "user-list-selected-filter"
                          : "user-list-select-options"
                      }
                      onClick={() => setRoleFilter(0)}
                    >
                      All
                    </div>
                    <div
                      className={
                        roleFilter === 1
                          ? "user-list-selected-filter"
                          : "user-list-select-options"
                      }
                      onClick={() => setRoleFilter(1)}
                    >
                      Admin
                    </div>
                    <div
                      className={
                        roleFilter === 2
                          ? "user-list-selected-filter"
                          : "user-list-select-options"
                      }
                      onClick={() => setRoleFilter(2)}
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
            skeletons.map((skeleton, index) => (
              <Col xs={12} sm={6} lg={3} key={index}>
                <UserSkeletons key={skeleton} />
              </Col>
            ))}
          {!isLoading && filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <Col xs={12} sm={6} lg={3} key={index}>
                <UserCards users={user} role={role} onDelete={() => handleDelete(user.email)} />
              </Col>
            ))
          ) : (
            <h2>No Results Found</h2>
          )}
        </Row>
      </Container>
      {showForm && <AdminUserForm onHide={handleForm} />}
    </>
  );
};

export default UsersGrid;
