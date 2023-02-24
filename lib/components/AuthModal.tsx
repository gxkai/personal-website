import React from "react";
import AuthForm from "./AuthForm";
import { motion } from "framer-motion";

const AuthModal: React.FC<{
  show?: boolean;
  onDone?: () => void;
  onCancel?: () => void;
}> = ({ show = false, onDone, onCancel }) => {
  if (!show) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full h-full grid place-items-center bg-[rgba(0,0,0,0.6)]"
    >
      <AuthForm onDone={onDone} onCancel={onCancel || onDone} />
    </motion.div>
  );
};

export default AuthModal;
