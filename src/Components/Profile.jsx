import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { setEmail } from "../utils/loginSlice";
import Cookies from "js-cookie"; 
import {
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  TextField,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LogoutModal from "./modals/LogoutModal";

// Styled Card
const StyledCard = styled(Card)({
  borderRadius: "8px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  background: "#FFFFFF",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  color: "#333",
});

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const token = Cookies.get("token");
  const [header, payload, signature] = token.split(".");
  const decodedPayload = JSON.parse(atob(payload));
  const email = decodedPayload._email;

  const fetchUserInfo = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/users?email=${email}`, {
        withCredentials: true,
      });
      if (result.data) {
        const user = result.data.data[0];
        setUsername(user.username);
        setFirstName(user.first_name || "");
        setLastName(user.last_name || "");
        setPhone(user.phone || "");
        setProfileImageUrl(user.image_url || "");
        setAddress(user.address || "");
      }
    } catch (error) {
      console.log("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    if (email) fetchUserInfo();
  }, [email]);

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      Cookies.remove("auth_token");
      dispatch(setEmail(null));
      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { username, firstName, lastName, profileImageUrl, phone, address };
      await axios.put(`${BASE_URL}/users/${email}`, updatedData, {
        withCredentials: true,
      });
      alert("Profile updated successfully");
    } catch (error) {
      console.log("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  return (
    <Container
      sx={{
        py: 6,
        px: { xs: 2, sm: 4 },
        maxWidth: "xl",
        width: "100%",
      }}
      className="md:h-screen flex items-center"
    >
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography variant="h5" fontWeight="bold" color="primary.main" sx={{ mb: 1 }}>
                  Your Profile
                </Typography>
                <Avatar
                  src={profileImageUrl}
                  alt="Profile"
                  sx={{
                    width: 150,
                    height: 150,
                    mx: "auto",
                    border: "4px solid #CCC",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                    mb: 2,
                  }}
                />
                <Chip
                  label={email}
                  sx={{
                    mb: 2,
                    backgroundColor: "#E0E0E0",
                    color: "#333",
                    fontSize: "14px",
                  }}
                />
                <Typography variant="h6" fontWeight="bold">
                  {username || "No Username"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {phone || "Phone number not provided"}
                </Typography>
              </Box>
              <Box sx={{ mt: "auto", textAlign: "center" }}>
                <Button
                  onClick={() => setOpenLogoutModal(true)}
                  variant="contained"
                  sx={{
                    maxWidth: "150px",
                    width: "100%",
                    borderRadius: "20px",
                    textTransform: "none",
                    padding: "8px",
                    fontWeight: "bold",
                    backgroundColor: "#383838",
                    color: "white",
                  }}
                >
                  LOG OUT
                </Button>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Edit Section */}
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardContent>
              <form onSubmit={handleProfileUpdate}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Profile Image URL"
                        variant="outlined"
                        fullWidth
                        value={profileImageUrl}
                        onChange={(e) => setProfileImageUrl(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    label="Address"
                    variant="outlined"
                    fullWidth
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <Box sx={{ textAlign: "center" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
                        maxWidth: "250px",
                        width: "100%",
                        borderRadius: "8px",
                        textTransform: "none",
                        padding: "8px",
                        fontWeight: "bold",
                      }}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Box>
              </form>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Logout Modal */}
      <LogoutModal
        open={openLogoutModal}
        onClose={() => setOpenLogoutModal(false)}
        onLogout={handleLogout}
      />
    </Container>
  );
};

export default Profile;
