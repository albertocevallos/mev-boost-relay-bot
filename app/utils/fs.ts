import path from "path";
import fs from "fs-extra";

const getTargetPath = (label: string) => {
  return path.join(__dirname, "../../../data/", `metadata-${label}.json`);
};

export const writeData = async (data, label) => {
  const targetPath = getTargetPath(label);
  try {
    await fs.writeJson(targetPath, data);
  } catch (e) {
    console.log(e);
  }
};

export const readData = async (label) => {
  const targetPath = getTargetPath(label);
  console.log("HERE", targetPath);
  try {
    return await fs.readJson(targetPath);
  } catch (e) {
    console.log(e);
  }
};
