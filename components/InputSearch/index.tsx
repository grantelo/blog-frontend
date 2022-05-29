import React, { ChangeEvent, KeyboardEvent } from "react";
import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import styles from "./InputSearch.module.sass";
import { useRouter } from "next/router";

const InputSearch = () => {
  const [value, setValue] = React.useState<string>("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.code === "NumpadEnter")
      router.push(`/search?query=${value.replace("#", "%23")}`);
  };

  return (
    <Paper elevation={0} className={styles.root}>
      <SearchIcon />
      <InputBase
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={"Поиск"}
        classes={{ root: styles.inputBase }}
      />
    </Paper>
  );
};

export default InputSearch;
