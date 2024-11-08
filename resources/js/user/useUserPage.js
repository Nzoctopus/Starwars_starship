import { useEffect, useState } from "react";
import useAuthViewModel from "../model/useAuthViewModel";
import useUserViewModel from "../model/useUserViewModel";
import { useAtom } from "jotai";
import { UserDataAtom } from "../atoms";
import useConnection from "../useConnetion";

export default function useUserPage() {
    const { updateUser } = useAuthViewModel();
    const { fetchCreatedSatellitesFromUser, fetchCreatedStarshipsFromUser } =
        useUserViewModel();

    const [User, setUser] = useAtom(UserDataAtom);
    const { loadUser } = useConnection();
    const [CreatedStarships, setCreatedStarships] = useState([]);
    const [CreatedSatellites, setCreatedSatellites] = useState([]);
    const [BannerLink, setBannerLink] = useState(
        "/images/banner_placeholder.png"
    );
    const [defaultBannerLink, setDefaultBannerLink] = useState(
        User.banner_file
            ? `/storage/${User.banner_file.path}`
            : "/images/banner_placeholder.png"
    );
    const [PfpLink, setPfpLink] = useState("/images/user_placeholder.jpg");
    const [defaultPfpLink, setDefaultPfpLink] = useState(
        User.pfp_file
            ? `/storage/${User.pfp_file.path}`
            : "/images/user_placeholder.jpg"
    );

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
            loadUser();
            fetchData();
        } catch (error) {
            console.error("Error updating user:", error);
        } finally {
            resetUserForm();
        }
    };

    const fetchData = async () => {
        try {
            const [satellites, starships] = await Promise.all([
                fetchCreatedSatellitesFromUser(User.id),
                fetchCreatedStarshipsFromUser(User.id),
            ]);
            setCreatedSatellites(satellites);
            setCreatedStarships(starships);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        setBannerLink(
            User.banner_file
                ? `/storage/${User.banner_file.path}`
                : "/images/banner_placeholder.png"
        );
        setPfpLink(
            User.pfp_file
                ? `/storage/${User.pfp_file.path}`
                : "/images/user_placeholder.jpg"
        );
        setDefaultBannerLink(
            User.banner_file
                ? `/storage/${User.banner_file.path}`
                : "/images/banner_placeholder.png"
        );
        setDefaultPfpLink(
            User.pfp_file
                ? `/storage/${User.pfp_file.path}`
                : "/images/user_placeholder.jpg"
        );
        fetchData();
    }, [User]);

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
