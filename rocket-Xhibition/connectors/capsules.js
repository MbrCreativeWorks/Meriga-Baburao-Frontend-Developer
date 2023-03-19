import axios from "axios";

let rockets = [
  { id: "falc", message: "hello" },
  { id: "2", message: "hello" },
  { id: "3", message: "hello" },
];
export const getCapsules = async (req, res) => {
  let rocketsData = await axios.get("https://api.spacexdata.com/v3/capsules");
  res.send(rocketsData.data);
};

export const getCapsule = async (req, res) => {
  let requestedRocketDetails = await axios.get(
    `https://api.spacexdata.com/v3/capsules/${req.params.capsule_serial}`
  );
  res.send(requestedRocketDetails.data);
};
