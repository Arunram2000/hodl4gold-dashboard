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
              Please submit your user info carefully, you will not be able to
              change your socials once set.
            </p>
            <p className="mb-20 alert alert-warning">
              *All fields are case-sensitive.
            </p>
            {error && (
              <p style={{ fontSize: 12, color: "tomato", textAlign: "center" }}>
                {error}
              </p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form_input">
                <label htmlFor="username">Twitter</label>
                <div className="input-group">
                  <div className="input-group-text">@</div>
                  <input
                    type="text"
                    name="username"
                    placeholder="ex: hodl4gold"
                    value={formData.username}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                {formData.username && (
                  <a
                    href={getLink(formData.username)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "12px", color: "#fcbc67" }}
                  >
                    Click here to see your profile. If it's not then type your
                    twitter username correctly
                  </a>
                )}
              </div>

              <div className="form_input">
                <label htmlFor="discord_username">Discord</label>
                <div className="input-group">
                  <div className="input-group-text">@</div>
                  <input
                    type="text"
                    name="discord_username"
                    placeholder="ex: hodl4gold#7708"
                    value={formData.discord_username}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="form_input">
                <label htmlFor="discord_username">Instagram</label>
                <div className="input-group">
                  <div className="input-group-text">@</div>
                  <input
                    type="text"
                    name="instagram_username"
                    placeholder="ex: hodl4gold"
                    value={formData.instagram_username}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="form_input mb-4">
                <label htmlFor="discord_username">Telegram</label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                  }}
                >
                  <div className="input-group">
                    <div className="input-group-text">@</div>
                    <input
                      type="text"
                      name="telegram_firstname"
                      placeholder="firstname"
                      value={formData.telegram_firstname}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="input-group">
                    <div className="input-group-text">@</div>
                    <input
                      type="text"
                      name="telegram_firstname"
                      placeholder="lastname"
                      value={formData.telegram_lastname}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <Button variant="secondary" disabled={loading}>
                Continue to Contests
              </Button>
            </form>
            {/* <p className="modal_footer-links">
              By continuing, you agree to all{" "}
              <a href="/" target="_blank" rel="noopener noreferrer">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="/" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
              .
            </p> */}
          </motion.div>
        )}
      </AnimatePresence>
    </Backdrop>
  );
};

export default FormModal;
