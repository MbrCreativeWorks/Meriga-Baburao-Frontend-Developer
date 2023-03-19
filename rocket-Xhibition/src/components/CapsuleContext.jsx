import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const CapsuleContext = createContext();

export function CapsuleProvider({ children }) {
  const [allCapsules, setAllCapsules] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCapsule, setShowCapsule] = useState({});

  const getAllCapsules = async () => {
    await axios.get("http://localhost:5000/capsules").then((result) => {
      setAllCapsules(result.data);
    });
  };

  useEffect(() => {
    getAllCapsules();
  }, []);
  const handleOk = (value) => {
    setIsModalOpen(value);
  };
  const showModal = (capsule) => {
    setIsModalOpen(true);
    setShowCapsule(capsule);
  };

  const contextValue = {
    isModalOpen,
    handleOk,
    showModal,
    showCapsule,
    allCapsules,
    getAllCapsules,
  };
  return (
    <CapsuleContext.Provider value={contextValue}>
      {children}
    </CapsuleContext.Provider>
  );
}

export const useCapsule = () => {
  return useContext(CapsuleContext);
};
