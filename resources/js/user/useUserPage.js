import { useEffect, useState } from "react";
import useAuthViewModel from "../model/useAuthViewModel";
import useUserViewModel from "../model/useUserViewModel";
import { useNavigate } from "react-router-dom";

export default function useUserPage() {
    const { getUser, isLoggedIn, updateUser } = useAuthViewModel();
    const { fetchCreatedSatellitesFromUser, fetchCreatedStarshipsFromUser } = useUserViewModel();

    const [User, setUser] = useState([]);
    const [CreatedStarships, setCreatedStarships] = useState([]);
    const [CreatedSatellites, setCreatedSatellites] = useState([]);
    const [BannerLink, setBannerLink] = useState("/images/banner_placeholder.png");
    const [defaultBannerLink, setDefaultBannerLink] = useState([]);
    const [PfpLink, setPfpLink] = useState("/images/user_placeholder.jpg");
    const [defaultPfpLink, setDefaultPfpLink] = useState([]);

    const navigate = useNavigate();

    const [UserForm, setUserForm] = useState({
        banner: null,
        pfp: null,
    });

    const handleChange = (e) => {
        const { name, files } = e.target;
        setUserForm((prev) => ({
            ...prev,
            [name]: files[0],
        }));
    };

    const resetUserForm = () => {
        setUserForm({
            banner: null,
            pfp: null,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const FinalForm = {
            id: User.id,
            banner: UserForm.banner,
            pfp: UserForm.pfp,
        };
        try {
            await updateUser(FinalForm);
            fetchData();
        } catch (error) {
            console.error("Error updating user:", error);
        } finally {
            resetUserForm();
        }
    };

    const fetchData = async () => {
        try {
            const loginStatus = await isLoggedIn();
            if (loginStatus.isLoggedIn) {
                const user = await getUser();
                setUser(user);
                setBannerLink(user.banner_file ? `/storage/${user.banner_file.path}` : "/images/banner_placeholder.png");
                setPfpLink(user.pfp_file ? `/storage/${user.pfp_file.path}` : "/images/user_placeholder.jpg");
                setDefaultBannerLink(user.banner_file ? `/storage/${user.banner_file.path}` : "/images/banner_placeholder.png");
                setDefaultPfpLink(user.pfp_file ? `/storage/${user.pfp_file.path}` : "/images/user_placeholder.jpg");
                console.log("user", user);
                const [satellites, starships] = await Promise.all([
                    fetchCreatedSatellitesFromUser(user.id),
                    fetchCreatedStarshipsFromUser(user.id),
                ]);

                setCreatedSatellites(satellites);
                setCreatedStarships(starships);
            } else {
                navigate("/starships/register");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (UserForm.banner) {
            const bannerURL = URL.createObjectURL(UserForm.banner);
            setBannerLink(bannerURL);
            return () => URL.revokeObjectURL(bannerURL);
        } else {
            setBannerLink(defaultBannerLink);
        }

        if (UserForm.pfp) {
            const pfpURL = URL.createObjectURL(UserForm.pfp);
            setPfpLink(pfpURL);
            return () => URL.revokeObjectURL(pfpURL);
        } else {
            setPfpLink(defaultPfpLink);
        }
    }, [UserForm]);

    return {
        User,
        CreatedSatellites,
        CreatedStarships,
        PfpLink,
        BannerLink,
        UserForm,
        handleChange,
        resetUserForm,
        handleSubmit,
    };
}
