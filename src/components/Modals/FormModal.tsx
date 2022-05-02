import { useWeb3React } from "@web3-react/core";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { getUsername, updateUserApi } from "../../api/denApi";
import { modalVaraints } from "../../constants/variants";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import Button from "../Button";
import Backdrop from "./Backdrop";

const getLink = (username: string) =>
  `https://twitter.com/intent/user?screen_name=${username}&original_referer=${window.location.href}en/docs/`;

const initialState = {
  username: "",
  discord_username: "",
  instagram_username: "",
  telegram_firstname: "",
  telegram_lastname: "",
};

interface IFormMdal {
  refetch: () => Promise<void>;
  modal: boolean;
}

const FormModal: React.FC<IFormMdal> = ({ refetch, modal }) => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { account } = useWeb3React();

  useUpdateEffect(() => {
    const timer = setTimeout(() => setError(null), 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!account) return;
    try {
      setLoading(true);
      setError(null);
      const formValues = {
        ...formData,
        telegram_username: `${formData.telegram_firstname} ${formData.telegram_lastname}`,
      };
      const { data } = await getUsername(formValues);

      if (Array.isArray(data.errors)) {
        setError(
          data.errors?.[0]?.detail
            ? data.errors?.[0]?.detail
            : "Invalid twitter username"
        );
        setLoading(false);
        return;
      }
      if (data?.errors) {
        setError(data.errors.message);
        setLoading(false);
        return;
      }

      await updateUserApi(account, formValues);
      refetch();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("something went wrong");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Backdrop isOpen={modal}>
      <AnimatePresence exitBeforeEnter>
        {modal && (
          <motion.div
            className="modal_wallet_content"
            onClick={(e) => e.stopPropagation()}
            variants={modalVaraints}
            animate="animate"
            initial="initial"
            exit="exit"
          >
            <h3>Getting to know you better</h3>
            <p className="mb-5 mt-10">
              This is a irreversible process. So kindly give the information
              correctly.
            </p>
            <p className="mb-20 text-warning">
              *All the fields are case sensitive.
            </p>
            {error && (
              <p style={{ fontSize: 12, color: "tomato", textAlign: "center" }}>
                {error}
              </p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form_input">
                <label htmlFor="username">Twitter username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="@username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                {formData.username && (
                  <a
                    href={getLink(formData.username)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "12px", color: "#fcbc67" }}
                  >
                    Click here to see your profile.If it's not then type your
                    twitter username correctly
                  </a>
                )}
              </div>
              <div className="form_input">
                <label htmlFor="discord_username">Discord username</label>
                <input
                  type="text"
                  name="discord_username"
                  placeholder="@discord_username"
                  value={formData.discord_username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form_input">
                <label htmlFor="discord_username">Instagram username</label>
                <input
                  type="text"
                  name="instagram_username"
                  placeholder="@instagram_username"
                  value={formData.instagram_username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form_input">
                <label htmlFor="discord_username">Telegram username</label>
                <div className="form_input_grid">
                  <input
                    type="text"
                    name="telegram_firstname"
                    placeholder="@first_name"
                    value={formData.telegram_firstname}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="telegram_lastname"
                    placeholder="@last_name"
                    value={formData.telegram_lastname}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              {/* <input type="email" placeholder="Email address" required /> */}
              <Button variant="secondary" disabled={loading}>
                Continue to the Den
              </Button>
            </form>
            <p className="modal_footer-links">
              By continuing, you agree to all{" "}
              <a href="/" target="_blank" rel="noopener noreferrer">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="/" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
              .
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Backdrop>
  );
};

export default FormModal;
