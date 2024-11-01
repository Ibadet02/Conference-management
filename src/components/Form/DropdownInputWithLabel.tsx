import { StyledDropdownInputWithLabel } from "../../styles/components/Form/DropdownInputWithLabel.styled";
import { DropdownInputWithLabelProps } from "../../types/Form/props";

const DropdownInputWithLabel: React.FC<DropdownInputWithLabelProps> = ({
  dropdownLabel,
  selectedOption,
  options,
  handleDropdownChange,
  dropdownName,
}) => {
  return (
    <StyledDropdownInputWithLabel>
      <label>{dropdownLabel}</label>
      <select
        name={dropdownName}
        value={selectedOption}
        onChange={(e) => handleDropdownChange(dropdownName, e.target.value)}
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </StyledDropdownInputWithLabel>
  );
};

export default DropdownInputWithLabel;
