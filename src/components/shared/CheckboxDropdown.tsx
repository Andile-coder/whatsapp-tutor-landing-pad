import { useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  Divider,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

export type CheckboxDropdownOption<TValue extends string> = {
  label: string;
  value: TValue;
  helper?: string;
};

type CheckboxDropdownProps<TValue extends string> = {
  label: string;
  options: Array<CheckboxDropdownOption<TValue>>;
  selectedValues: TValue[];
  onChange: (values: TValue[]) => void;
  emptyLabel?: string;
};

const CheckboxDropdown = <TValue extends string>({
  label,
  options,
  selectedValues,
  onChange,
  emptyLabel = "Any",
}: CheckboxDropdownProps<TValue>) => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorElement);

  const selectedLabel = useMemo(() => {
    if (!selectedValues.length) {
      return emptyLabel;
    }

    if (selectedValues.length === options.length) {
      return "All";
    }

    return options
      .filter((option) => selectedValues.includes(option.value))
      .map((option) => option.label)
      .join(", ");
  }, [emptyLabel, options, selectedValues]);

  const toggleValue = (value: TValue) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((selectedValue) => selectedValue !== value));
      return;
    }

    onChange([...selectedValues, value]);
  };

  const selectAll = () => {
    onChange(options.map((option) => option.value));
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={(event) => setAnchorElement(event.currentTarget)}
        endIcon={<KeyboardArrowDownRoundedIcon />}
        sx={{
          minWidth: 180,
          justifyContent: "space-between",
          borderColor: "#d0d5dd",
          color: "#344054",
          bgcolor: "#ffffff",
          px: 1.5,
          "&:hover": {
            borderColor: "#98a2b3",
            bgcolor: "#fcfcfd",
          },
        }}
      >
        <Stack direction="row" spacing={1} sx={{ minWidth: 0 }}>
          <Typography component="span" sx={{ fontWeight: 700 }}>
            {label}:
          </Typography>
          <Typography
            component="span"
            sx={{
              color: "text.secondary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: 160,
            }}
          >
            {selectedLabel}
          </Typography>
        </Stack>
      </Button>

      <Menu
        anchorEl={anchorElement}
        open={open}
        onClose={() => setAnchorElement(null)}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 260,
            borderRadius: 0,
            border: "1px solid #e4e7ec",
            boxShadow: "0 16px 36px rgba(16,24,40,0.12)",
          },
        }}
      >
        <Stack direction="row" spacing={1} sx={{ px: 1, py: 1 }}>
          <Button size="small" onClick={selectAll}>
            All
          </Button>
          <Button size="small" color="inherit" onClick={clearAll}>
            Clear
          </Button>
        </Stack>
        <Divider />
        {options.map((option) => (
          <MenuItem key={option.value} onClick={() => toggleValue(option.value)}>
            <Checkbox
              checked={selectedValues.includes(option.value)}
              size="small"
            />
            <ListItemText
              primary={option.label}
              secondary={option.helper}
              primaryTypographyProps={{ fontWeight: 700 }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CheckboxDropdown;
