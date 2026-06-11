import { r as __toESM } from "./chunk-B-1-B7_t.js";
import { t as require_react } from "./react.js";
import { $ as generateUtilityClass, Et as require_prop_types, J as useThemeProps$1, O as createCssVarsProvider, Q as generateUtilityClasses, Tt as clsx, Z as styled, _ as createTypography, a as useTheme$1, at as createSpacing, bt as createBreakpoints, c as createTheme$1, it as createTheme, j as ThemeProvider$1, k as InitColorSchemeScript$1, l as createThemeWithVars, n as styled$1, nt as useTheme, o as identifier_default, pt as styleFunctionSx_default, s as defaultTheme$1, st as require_jsx_runtime, t as useDefaultProps, wt as composeClasses, xt as deepmerge } from "./DefaultPropsProvider-BSdJGDea.js";
//#region node_modules/@mui/utils/isMuiElement/isMuiElement.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function isMuiElement(element, muiNames) {
	return /*#__PURE__*/ import_react.isValidElement(element) && muiNames.indexOf(element.type.muiName ?? element.type?._payload?.value?.muiName) !== -1;
}
//#endregion
//#region node_modules/@mui/system/Grid/traverseBreakpoints.mjs
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var filterBreakpointKeys = (breakpointsKeys, responsiveKeys) => breakpointsKeys.filter((key) => responsiveKeys.includes(key));
var traverseBreakpoints = (breakpoints, responsive, iterator) => {
	const smallestBreakpoint = breakpoints.keys[0];
	if (Array.isArray(responsive)) responsive.forEach((breakpointValue, index) => {
		iterator((responsiveStyles, style) => {
			if (index <= breakpoints.keys.length - 1) if (index === 0) Object.assign(responsiveStyles, style);
			else responsiveStyles[breakpoints.up(breakpoints.keys[index])] = style;
		}, breakpointValue);
	});
	else if (responsive && typeof responsive === "object") (Object.keys(responsive).length > breakpoints.keys.length ? breakpoints.keys : filterBreakpointKeys(breakpoints.keys, Object.keys(responsive))).forEach((key) => {
		if (breakpoints.keys.includes(key)) {
			const breakpointValue = responsive[key];
			if (breakpointValue !== void 0) iterator((responsiveStyles, style) => {
				if (smallestBreakpoint === key) Object.assign(responsiveStyles, style);
				else responsiveStyles[breakpoints.up(key)] = style;
			}, breakpointValue);
		}
	});
	else if (typeof responsive === "number" || typeof responsive === "string") iterator((responsiveStyles, style) => {
		Object.assign(responsiveStyles, style);
	}, responsive);
};
//#endregion
//#region node_modules/@mui/system/Grid/gridGenerator.mjs
function getSelfSpacingVar(axis) {
	return `--Grid-${axis}Spacing`;
}
function getParentSpacingVar(axis) {
	return `--Grid-parent-${axis}Spacing`;
}
var selfColumnsVar = "--Grid-columns";
var parentColumnsVar = "--Grid-parent-columns";
var generateGridSizeStyles = ({ theme, ownerState }) => {
	const styles = {};
	traverseBreakpoints(theme.breakpoints, ownerState.size, (appendStyle, value) => {
		let style = {};
		if (value === "grow") style = {
			flexBasis: 0,
			flexGrow: 1,
			maxWidth: "100%"
		};
		if (value === "auto") style = {
			flexBasis: "auto",
			flexGrow: 0,
			flexShrink: 0,
			maxWidth: "none",
			width: "auto"
		};
		if (typeof value === "number") style = {
			flexGrow: 0,
			flexBasis: "auto",
			width: `calc(100% * ${value} / var(${parentColumnsVar}) - (var(${parentColumnsVar}) - ${value}) * (var(${getParentSpacingVar("column")}) / var(${parentColumnsVar})))`
		};
		appendStyle(styles, style);
	});
	return styles;
};
var generateGridOffsetStyles = ({ theme, ownerState }) => {
	const styles = {};
	traverseBreakpoints(theme.breakpoints, ownerState.offset, (appendStyle, value) => {
		let style = {};
		if (value === "auto") style = { marginLeft: "auto" };
		if (typeof value === "number") style = { marginLeft: value === 0 ? "0px" : `calc(100% * ${value} / var(${parentColumnsVar}) + var(${getParentSpacingVar("column")}) * ${value} / var(${parentColumnsVar}))` };
		appendStyle(styles, style);
	});
	return styles;
};
var generateGridColumnsStyles = ({ theme, ownerState }) => {
	if (!ownerState.container) return {};
	const styles = { [selfColumnsVar]: 12 };
	traverseBreakpoints(theme.breakpoints, ownerState.columns, (appendStyle, value) => {
		const columns = value ?? 12;
		appendStyle(styles, {
			[selfColumnsVar]: columns,
			"> *": { [parentColumnsVar]: columns }
		});
	});
	return styles;
};
var generateGridRowSpacingStyles = ({ theme, ownerState }) => {
	if (!ownerState.container) return {};
	const styles = {};
	traverseBreakpoints(theme.breakpoints, ownerState.rowSpacing, (appendStyle, value) => {
		const spacing = typeof value === "string" ? value : theme.spacing?.(value);
		appendStyle(styles, {
			[getSelfSpacingVar("row")]: spacing,
			"> *": { [getParentSpacingVar("row")]: spacing }
		});
	});
	return styles;
};
var generateGridColumnSpacingStyles = ({ theme, ownerState }) => {
	if (!ownerState.container) return {};
	const styles = {};
	traverseBreakpoints(theme.breakpoints, ownerState.columnSpacing, (appendStyle, value) => {
		const spacing = typeof value === "string" ? value : theme.spacing?.(value);
		appendStyle(styles, {
			[getSelfSpacingVar("column")]: spacing,
			"> *": { [getParentSpacingVar("column")]: spacing }
		});
	});
	return styles;
};
var generateGridDirectionStyles = ({ theme, ownerState }) => {
	if (!ownerState.container) return {};
	const styles = {};
	traverseBreakpoints(theme.breakpoints, ownerState.direction, (appendStyle, value) => {
		appendStyle(styles, { flexDirection: value });
	});
	return styles;
};
var generateGridStyles = ({ ownerState }) => {
	return {
		minWidth: 0,
		boxSizing: "border-box",
		...ownerState.container && {
			display: "flex",
			flexWrap: "wrap",
			...ownerState.wrap && ownerState.wrap !== "wrap" && { flexWrap: ownerState.wrap },
			gap: `var(${getSelfSpacingVar("row")}) var(${getSelfSpacingVar("column")})`
		}
	};
};
var generateSizeClassNames = (size) => {
	const classNames = [];
	Object.entries(size).forEach(([key, value]) => {
		if (value !== false && value !== void 0) classNames.push(`grid-${key}-${String(value)}`);
	});
	return classNames;
};
var generateSpacingClassNames = (spacing, smallestBreakpoint = "xs") => {
	function isValidSpacing(val) {
		if (val === void 0) return false;
		return typeof val === "string" && !Number.isNaN(Number(val)) || typeof val === "number" && val > 0;
	}
	if (isValidSpacing(spacing)) return [`spacing-${smallestBreakpoint}-${String(spacing)}`];
	if (typeof spacing === "object" && !Array.isArray(spacing)) {
		const classNames = [];
		Object.entries(spacing).forEach(([key, value]) => {
			if (isValidSpacing(value)) classNames.push(`spacing-${key}-${String(value)}`);
		});
		return classNames;
	}
	return [];
};
var generateDirectionClasses = (direction) => {
	if (direction === void 0) return [];
	if (typeof direction === "object") return Object.entries(direction).map(([key, value]) => `direction-${key}-${value}`);
	return [`direction-xs-${String(direction)}`];
};
//#endregion
//#region node_modules/@mui/system/Grid/createGrid.mjs
var import_jsx_runtime = require_jsx_runtime();
var defaultTheme = createTheme();
var defaultCreateStyledComponent = styled("div", {
	name: "MuiGrid",
	slot: "Root"
});
function useThemePropsDefault(props) {
	return useThemeProps$1({
		props,
		name: "MuiGrid",
		defaultTheme
	});
}
function createGrid(options = {}) {
	const { createStyledComponent = defaultCreateStyledComponent, useThemeProps = useThemePropsDefault, useTheme: useTheme$2 = useTheme, componentName = "MuiGrid" } = options;
	const useUtilityClasses = (ownerState, theme) => {
		const { container, direction, spacing, wrap, size } = ownerState;
		return composeClasses({ root: [
			"root",
			container && "container",
			wrap !== "wrap" && `wrap-xs-${String(wrap)}`,
			...generateDirectionClasses(direction),
			...generateSizeClassNames(size),
			...container ? generateSpacingClassNames(spacing, theme.breakpoints.keys[0]) : []
		] }, (slot) => generateUtilityClass(componentName, slot), {});
	};
	function parseResponsiveProp(propValue, breakpoints, shouldUseValue = () => true) {
		const parsedProp = {};
		if (propValue === null) return parsedProp;
		if (Array.isArray(propValue)) propValue.forEach((value, index) => {
			if (value !== null && shouldUseValue(value) && breakpoints.keys[index]) parsedProp[breakpoints.keys[index]] = value;
		});
		else if (typeof propValue === "object") Object.keys(propValue).forEach((key) => {
			const value = propValue[key];
			if (value !== null && value !== void 0 && shouldUseValue(value)) parsedProp[key] = value;
		});
		else parsedProp[breakpoints.keys[0]] = propValue;
		return parsedProp;
	}
	const GridRoot = createStyledComponent(generateGridColumnsStyles, generateGridColumnSpacingStyles, generateGridRowSpacingStyles, generateGridSizeStyles, generateGridDirectionStyles, generateGridStyles, generateGridOffsetStyles);
	const Grid = /*#__PURE__*/ import_react.forwardRef(function Grid(inProps, ref) {
		const theme = useTheme$2();
		const props = useThemeProps(inProps);
		const { className, children, columns: columnsProp = 12, container = false, component = "div", direction = "row", wrap = "wrap", size: sizeProp = {}, offset: offsetProp = {}, spacing: spacingProp = 0, rowSpacing: rowSpacingProp = spacingProp, columnSpacing: columnSpacingProp = spacingProp, unstable_level: level = 0, ...other } = props;
		const size = parseResponsiveProp(sizeProp, theme.breakpoints, (val) => val !== false);
		const offset = parseResponsiveProp(offsetProp, theme.breakpoints);
		const columns = inProps.columns ?? (level ? void 0 : columnsProp);
		const spacing = inProps.spacing ?? (level ? void 0 : spacingProp);
		const rowSpacing = inProps.rowSpacing ?? inProps.spacing ?? (level ? void 0 : rowSpacingProp);
		const columnSpacing = inProps.columnSpacing ?? inProps.spacing ?? (level ? void 0 : columnSpacingProp);
		const ownerState = {
			...props,
			level,
			columns,
			container,
			direction,
			wrap,
			spacing,
			rowSpacing,
			columnSpacing,
			size,
			offset
		};
		return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(GridRoot, {
			ref,
			as: component,
			ownerState,
			className: clsx(useUtilityClasses(ownerState, theme).root, className),
			...other,
			children: import_react.Children.map(children, (child) => {
				if (/*#__PURE__*/ import_react.isValidElement(child) && isMuiElement(child, ["Grid"]) && container && child.props.container) return /*#__PURE__*/ import_react.cloneElement(child, { unstable_level: child.props?.unstable_level ?? level + 1 });
				return child;
			})
		});
	});
	Grid.propTypes = {
		children: import_prop_types.default.node,
		className: import_prop_types.default.string,
		columns: import_prop_types.default.oneOfType([
			import_prop_types.default.arrayOf(import_prop_types.default.number),
			import_prop_types.default.number,
			import_prop_types.default.object
		]),
		columnSpacing: import_prop_types.default.oneOfType([
			import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string])),
			import_prop_types.default.number,
			import_prop_types.default.object,
			import_prop_types.default.string
		]),
		component: import_prop_types.default.elementType,
		container: import_prop_types.default.bool,
		direction: import_prop_types.default.oneOfType([
			import_prop_types.default.oneOf([
				"column-reverse",
				"column",
				"row-reverse",
				"row"
			]),
			import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
				"column-reverse",
				"column",
				"row-reverse",
				"row"
			])),
			import_prop_types.default.object
		]),
		offset: import_prop_types.default.oneOfType([
			import_prop_types.default.string,
			import_prop_types.default.number,
			import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.number])),
			import_prop_types.default.object
		]),
		rowSpacing: import_prop_types.default.oneOfType([
			import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string])),
			import_prop_types.default.number,
			import_prop_types.default.object,
			import_prop_types.default.string
		]),
		size: import_prop_types.default.oneOfType([
			import_prop_types.default.string,
			import_prop_types.default.bool,
			import_prop_types.default.number,
			import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
				import_prop_types.default.string,
				import_prop_types.default.bool,
				import_prop_types.default.number
			])),
			import_prop_types.default.object
		]),
		spacing: import_prop_types.default.oneOfType([
			import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string])),
			import_prop_types.default.number,
			import_prop_types.default.object,
			import_prop_types.default.string
		]),
		sx: import_prop_types.default.oneOfType([
			import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
				import_prop_types.default.func,
				import_prop_types.default.object,
				import_prop_types.default.bool
			])),
			import_prop_types.default.func,
			import_prop_types.default.object
		]),
		wrap: import_prop_types.default.oneOf([
			"nowrap",
			"wrap-reverse",
			"wrap"
		])
	};
	Grid.muiName = "Grid";
	return Grid;
}
//#endregion
//#region node_modules/@mui/material/styles/adaptV4Theme.mjs
function adaptV4Theme(inputTheme) {
	console.warn(["MUI: adaptV4Theme() is deprecated.", "Follow the upgrade guide on https://mui.com/r/migration-v4#theme."].join("\n"));
	const { defaultProps = {}, mixins = {}, overrides = {}, palette = {}, props = {}, styleOverrides = {}, ...other } = inputTheme;
	const theme = {
		...other,
		components: {}
	};
	Object.keys(defaultProps).forEach((component) => {
		const componentValue = theme.components[component] || {};
		componentValue.defaultProps = defaultProps[component];
		theme.components[component] = componentValue;
	});
	Object.keys(props).forEach((component) => {
		const componentValue = theme.components[component] || {};
		componentValue.defaultProps = props[component];
		theme.components[component] = componentValue;
	});
	Object.keys(styleOverrides).forEach((component) => {
		const componentValue = theme.components[component] || {};
		componentValue.styleOverrides = styleOverrides[component];
		theme.components[component] = componentValue;
	});
	Object.keys(overrides).forEach((component) => {
		const componentValue = theme.components[component] || {};
		componentValue.styleOverrides = overrides[component];
		theme.components[component] = componentValue;
	});
	theme.spacing = createSpacing(inputTheme.spacing);
	const breakpoints = createBreakpoints(inputTheme.breakpoints || {});
	const spacing = theme.spacing;
	theme.mixins = {
		gutters: (styles = {}) => {
			return {
				paddingLeft: spacing(2),
				paddingRight: spacing(2),
				...styles,
				[breakpoints.up("sm")]: {
					paddingLeft: spacing(3),
					paddingRight: spacing(3),
					...styles[breakpoints.up("sm")]
				}
			};
		},
		...mixins
	};
	const { type: typeInput, mode: modeInput, ...paletteRest } = palette;
	const finalMode = modeInput || typeInput || "light";
	theme.palette = {
		text: { hint: finalMode === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.38)" },
		mode: finalMode,
		type: finalMode,
		...paletteRest
	};
	return theme;
}
//#endregion
//#region node_modules/@mui/material/AccordionSummary/accordionSummaryClasses.mjs
function getAccordionSummaryUtilityClass(slot) {
	return generateUtilityClass("MuiAccordionSummary", slot);
}
var accordionSummaryClasses = generateUtilityClasses("MuiAccordionSummary", [
	"root",
	"expanded",
	"focusVisible",
	"disabled",
	"gutters",
	"content",
	"expandIconWrapper"
]);
//#endregion
//#region node_modules/@mui/material/Autocomplete/autocompleteClasses.mjs
function getAutocompleteUtilityClass(slot) {
	return generateUtilityClass("MuiAutocomplete", slot);
}
var autocompleteClasses = generateUtilityClasses("MuiAutocomplete", [
	"root",
	"expanded",
	"fullWidth",
	"focused",
	"focusVisible",
	"tag",
	"tagSizeSmall",
	"tagSizeMedium",
	"hasPopupIcon",
	"hasClearIcon",
	"inputRoot",
	"input",
	"inputFocused",
	"endAdornment",
	"clearIndicator",
	"popupIndicator",
	"popupIndicatorOpen",
	"popper",
	"popperDisablePortal",
	"paper",
	"listbox",
	"loading",
	"noOptions",
	"option",
	"groupLabel",
	"groupUl"
]);
//#endregion
//#region node_modules/@mui/material/Checkbox/checkboxClasses.mjs
function getCheckboxUtilityClass(slot) {
	return generateUtilityClass("MuiCheckbox", slot);
}
var checkboxClasses = generateUtilityClasses("MuiCheckbox", [
	"root",
	"checked",
	"disabled",
	"indeterminate",
	"colorPrimary",
	"colorSecondary",
	"sizeSmall",
	"sizeMedium"
]);
//#endregion
//#region node_modules/@mui/material/InputBase/inputBaseClasses.mjs
function getInputBaseUtilityClass(slot) {
	return generateUtilityClass("MuiInputBase", slot);
}
var inputBaseClasses = generateUtilityClasses("MuiInputBase", [
	"root",
	"formControl",
	"focused",
	"disabled",
	"adornedStart",
	"adornedEnd",
	"error",
	"sizeSmall",
	"multiline",
	"colorSecondary",
	"fullWidth",
	"hiddenLabel",
	"readOnly",
	"input",
	"inputTypeSearch"
]);
//#endregion
//#region node_modules/@mui/material/FilledInput/filledInputClasses.mjs
function getFilledInputUtilityClass(slot) {
	return generateUtilityClass("MuiFilledInput", slot);
}
var filledInputClasses = {
	...inputBaseClasses,
	...generateUtilityClasses("MuiFilledInput", [
		"root",
		"underline",
		"input",
		"adornedStart",
		"adornedEnd",
		"sizeSmall",
		"multiline",
		"hiddenLabel"
	])
};
//#endregion
//#region node_modules/@mui/material/FormControlLabel/formControlLabelClasses.mjs
function getFormControlLabelUtilityClasses(slot) {
	return generateUtilityClass("MuiFormControlLabel", slot);
}
var formControlLabelClasses = generateUtilityClasses("MuiFormControlLabel", [
	"root",
	"labelPlacementStart",
	"labelPlacementTop",
	"labelPlacementBottom",
	"disabled",
	"label",
	"error",
	"required",
	"asterisk"
]);
//#endregion
//#region node_modules/@mui/material/FormHelperText/formHelperTextClasses.mjs
function getFormHelperTextUtilityClasses(slot) {
	return generateUtilityClass("MuiFormHelperText", slot);
}
var formHelperTextClasses = generateUtilityClasses("MuiFormHelperText", [
	"root",
	"error",
	"disabled",
	"sizeSmall",
	"sizeMedium",
	"contained",
	"focused",
	"filled",
	"required"
]);
//#endregion
//#region node_modules/@mui/material/FormLabel/formLabelClasses.mjs
function getFormLabelUtilityClasses(slot) {
	return generateUtilityClass("MuiFormLabel", slot);
}
var formLabelClasses = generateUtilityClasses("MuiFormLabel", [
	"root",
	"colorSecondary",
	"focused",
	"disabled",
	"error",
	"filled",
	"required",
	"asterisk"
]);
//#endregion
//#region node_modules/@mui/material/Input/inputClasses.mjs
function getInputUtilityClass(slot) {
	return generateUtilityClass("MuiInput", slot);
}
var inputClasses = {
	...inputBaseClasses,
	...generateUtilityClasses("MuiInput", [
		"root",
		"underline",
		"input"
	])
};
//#endregion
//#region node_modules/@mui/material/ListItemButton/listItemButtonClasses.mjs
function getListItemButtonUtilityClass(slot) {
	return generateUtilityClass("MuiListItemButton", slot);
}
var listItemButtonClasses = generateUtilityClasses("MuiListItemButton", [
	"root",
	"focusVisible",
	"dense",
	"alignItemsFlexStart",
	"disabled",
	"divider",
	"gutters",
	"selected"
]);
//#endregion
//#region node_modules/@mui/material/MenuItem/menuItemClasses.mjs
function getMenuItemUtilityClass(slot) {
	return generateUtilityClass("MuiMenuItem", slot);
}
var menuItemClasses = generateUtilityClasses("MuiMenuItem", [
	"root",
	"focusVisible",
	"dense",
	"disabled",
	"divider",
	"gutters",
	"selected"
]);
//#endregion
//#region node_modules/@mui/material/NativeSelect/nativeSelectClasses.mjs
function getNativeSelectUtilityClasses(slot) {
	return generateUtilityClass("MuiNativeSelect", slot);
}
var nativeSelectClasses = generateUtilityClasses("MuiNativeSelect", [
	"root",
	"select",
	"multiple",
	"filled",
	"outlined",
	"standard",
	"disabled",
	"icon",
	"iconOpen",
	"iconFilled",
	"iconOutlined",
	"iconStandard",
	"nativeInput",
	"error"
]);
//#endregion
//#region node_modules/@mui/material/OutlinedInput/outlinedInputClasses.mjs
function getOutlinedInputUtilityClass(slot) {
	return generateUtilityClass("MuiOutlinedInput", slot);
}
var outlinedInputClasses = {
	...inputBaseClasses,
	...generateUtilityClasses("MuiOutlinedInput", [
		"root",
		"notchedOutline",
		"input"
	])
};
//#endregion
//#region node_modules/@mui/material/Radio/radioClasses.mjs
function getRadioUtilityClass(slot) {
	return generateUtilityClass("MuiRadio", slot);
}
var radioClasses = generateUtilityClasses("MuiRadio", [
	"root",
	"checked",
	"disabled",
	"colorPrimary",
	"colorSecondary",
	"sizeSmall"
]);
//#endregion
//#region node_modules/@mui/material/Slider/sliderClasses.mjs
function getSliderUtilityClass(slot) {
	return generateUtilityClass("MuiSlider", slot);
}
var sliderClasses = generateUtilityClasses("MuiSlider", [
	"root",
	"active",
	"colorPrimary",
	"colorSecondary",
	"colorError",
	"colorInfo",
	"colorSuccess",
	"colorWarning",
	"disabled",
	"dragging",
	"focusVisible",
	"mark",
	"markActive",
	"marked",
	"markLabel",
	"markLabelActive",
	"rail",
	"sizeSmall",
	"thumb",
	"track",
	"trackInverted",
	"trackFalse",
	"valueLabel",
	"valueLabelOpen",
	"valueLabelCircle",
	"valueLabelLabel",
	"vertical"
]);
//#endregion
//#region node_modules/@mui/material/ToggleButton/toggleButtonClasses.mjs
function getToggleButtonUtilityClass(slot) {
	return generateUtilityClass("MuiToggleButton", slot);
}
var toggleButtonClasses = generateUtilityClasses("MuiToggleButton", [
	"root",
	"disabled",
	"selected",
	"standard",
	"primary",
	"secondary",
	"sizeSmall",
	"sizeMedium",
	"sizeLarge",
	"fullWidth"
]);
//#endregion
//#region node_modules/@mui/material/styles/enhanceHighContrast.mjs
var defaultHcTokens = {
	disabled: "GrayText",
	error: "ActiveText",
	selectedBackground: "SelectedItem",
	selectedText: "SelectedItemText",
	activeBackground: "Highlight",
	activeText: "HighlightText",
	buttonBorder: "ButtonBorder",
	buttonText: "ButtonText",
	canvas: "Canvas"
};
var HCM = "@media (forced-colors: active)";
/**
* Enhances a theme with styles for Windows High Contrast Mode (forced-colors).
*
* Accepts a fully-created theme, merges in HCM component overrides using arrays
* so that Emotion emits each entry as a separate CSS rule and the browser
* cascade (rather than JS object merging) resolves specificity.
*
* @param themeInput - The theme to enhance.
* @param tokens - Override any of the default system color tokens.
* @returns The enhanced theme (same type as the input).
*
* @example
* // Use defaults
* const theme = enhanceHighContrast(createTheme({ palette: { ... } }));
*
* @example
* // Override specific tokens
* const theme = enhanceHighContrast(createTheme(), { disabled: 'ButtonText' });
*/
function enhanceHighContrast(themeInput, tokens) {
	const hcTokens = {
		disabled: tokens?.disabled ?? defaultHcTokens.disabled,
		error: tokens?.error ?? defaultHcTokens.error,
		selectedBackground: tokens?.selectedBackground ?? defaultHcTokens.selectedBackground,
		selectedText: tokens?.selectedText ?? defaultHcTokens.selectedText,
		activeBackground: tokens?.activeBackground ?? defaultHcTokens.activeBackground,
		activeText: tokens?.activeText ?? defaultHcTokens.activeText,
		buttonBorder: tokens?.buttonBorder ?? defaultHcTokens.buttonBorder,
		buttonText: tokens?.buttonText ?? defaultHcTokens.buttonText,
		canvas: tokens?.canvas ?? defaultHcTokens.canvas
	};
	const theme = { ...themeInput };
	const c = theme.components;
	theme.components = {
		...c,
		MuiAccordionSummary: {
			...c?.MuiAccordionSummary,
			styleOverrides: {
				...c?.MuiAccordionSummary?.styleOverrides,
				root: [c?.MuiAccordionSummary?.styleOverrides?.root, { [`&.${accordionSummaryClasses.disabled}`]: { [HCM]: { opacity: 1 } } }]
			}
		},
		MuiAutocomplete: {
			...c?.MuiAutocomplete,
			styleOverrides: {
				...c?.MuiAutocomplete?.styleOverrides,
				listbox: [c?.MuiAutocomplete?.styleOverrides?.listbox, { [`& .${autocompleteClasses.option}`]: {
					"&[aria-disabled=\"true\"]": { [HCM]: {
						color: hcTokens.disabled,
						opacity: 1
					} },
					[`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focusVisible}`]: { [HCM]: {
						forcedColorAdjust: "none",
						color: hcTokens.activeText,
						backgroundColor: hcTokens.activeBackground
					} },
					"&[aria-selected=\"true\"]": {
						[HCM]: {
							forcedColorAdjust: "none",
							color: hcTokens.selectedText,
							backgroundColor: hcTokens.selectedBackground
						},
						[`&.${autocompleteClasses.focused}`]: { [HCM]: {
							color: hcTokens.activeText,
							backgroundColor: hcTokens.activeBackground
						} }
					}
				} }]
			}
		},
		MuiCheckbox: {
			...c?.MuiCheckbox,
			styleOverrides: {
				...c?.MuiCheckbox?.styleOverrides,
				root: [c?.MuiCheckbox?.styleOverrides?.root, { [`&.${checkboxClasses.disabled}`]: { [HCM]: { color: hcTokens.disabled } } }]
			}
		},
		MuiFilledInput: {
			...c?.MuiFilledInput,
			styleOverrides: {
				...c?.MuiFilledInput?.styleOverrides,
				root: [c?.MuiFilledInput?.styleOverrides?.root, {
					[`&.${filledInputClasses.error}`]: { "&::before, &::after": { [HCM]: { borderBottomColor: hcTokens.error } } },
					[`&.${filledInputClasses.disabled}:before`]: { [HCM]: {
						borderBottomStyle: "solid",
						borderBottomColor: hcTokens.disabled
					} },
					[`&.${filledInputClasses.disabled}`]: { [HCM]: { color: hcTokens.disabled } }
				}]
			}
		},
		MuiFormControlLabel: {
			...c?.MuiFormControlLabel,
			styleOverrides: {
				...c?.MuiFormControlLabel?.styleOverrides,
				root: [c?.MuiFormControlLabel?.styleOverrides?.root, { [`& .${formControlLabelClasses.label}.${formControlLabelClasses.disabled}`]: { [HCM]: { color: hcTokens.disabled } } }]
			}
		},
		MuiFormHelperText: {
			...c?.MuiFormHelperText,
			styleOverrides: {
				...c?.MuiFormHelperText?.styleOverrides,
				root: [c?.MuiFormHelperText?.styleOverrides?.root, {
					[`&.${formHelperTextClasses.error}`]: { [HCM]: { color: hcTokens.error } },
					[`&.${formHelperTextClasses.disabled}`]: { [HCM]: { color: hcTokens.disabled } }
				}]
			}
		},
		MuiFormLabel: {
			...c?.MuiFormLabel,
			styleOverrides: {
				...c?.MuiFormLabel?.styleOverrides,
				root: [c?.MuiFormLabel?.styleOverrides?.root, {
					[`&.${formLabelClasses.error}`]: { [HCM]: { color: hcTokens.error } },
					[`&.${formLabelClasses.disabled}`]: { [HCM]: { color: hcTokens.disabled } }
				}]
			}
		},
		MuiInput: {
			...c?.MuiInput,
			styleOverrides: {
				...c?.MuiInput?.styleOverrides,
				root: [c?.MuiInput?.styleOverrides?.root, {
					[`&.${inputClasses.error}`]: { "&::before, &::after": { [HCM]: { borderBottomColor: hcTokens.error } } },
					[`&.${inputClasses.disabled}:before`]: { [HCM]: {
						borderBottomStyle: "solid",
						borderBottomColor: hcTokens.disabled
					} },
					[`&.${inputClasses.disabled}`]: { [HCM]: { color: hcTokens.disabled } }
				}]
			}
		},
		MuiLinearProgress: {
			...c?.MuiLinearProgress,
			styleOverrides: {
				...c?.MuiLinearProgress?.styleOverrides,
				root: [c?.MuiLinearProgress?.styleOverrides?.root, { [HCM]: {
					forcedColorAdjust: "none",
					outline: `1px solid ${hcTokens.buttonBorder}`,
					backgroundColor: hcTokens.canvas
				} }],
				bar: [c?.MuiLinearProgress?.styleOverrides?.bar, { [HCM]: { backgroundColor: hcTokens.buttonText } }],
				bar2: [c?.MuiLinearProgress?.styleOverrides?.bar2, { variants: [{
					props: { variant: "buffer" },
					style: { [HCM]: { backgroundColor: hcTokens.disabled } }
				}] }]
			}
		},
		MuiInputBase: {
			...c?.MuiInputBase,
			styleOverrides: {
				...c?.MuiInputBase?.styleOverrides,
				input: [c?.MuiInputBase?.styleOverrides?.input, { [HCM]: { "&::placeholder": { opacity: 1 } } }]
			}
		},
		MuiMenuItem: {
			...c?.MuiMenuItem,
			styleOverrides: {
				...c?.MuiMenuItem?.styleOverrides,
				root: [c?.MuiMenuItem?.styleOverrides?.root, {
					[`&.${menuItemClasses.disabled}`]: { [HCM]: {
						color: hcTokens.disabled,
						opacity: 1
					} },
					[`&.${menuItemClasses.focusVisible}, &:hover`]: { [HCM]: {
						forcedColorAdjust: "none",
						color: hcTokens.activeText,
						backgroundColor: hcTokens.activeBackground,
						outline: "none"
					} },
					[`&.${menuItemClasses.selected}`]: { [HCM]: {
						forcedColorAdjust: "none",
						color: hcTokens.selectedText,
						backgroundColor: hcTokens.selectedBackground
					} },
					[`&.${menuItemClasses.selected}.${menuItemClasses.focusVisible}, &.${menuItemClasses.selected}:hover`]: { [HCM]: {
						color: hcTokens.activeText,
						backgroundColor: hcTokens.activeBackground
					} }
				}]
			}
		},
		MuiListItemIcon: {
			...c?.MuiListItemIcon,
			styleOverrides: {
				...c?.MuiListItemIcon?.styleOverrides,
				root: [c?.MuiListItemIcon?.styleOverrides?.root, { [HCM]: { color: "inherit" } }]
			}
		},
		MuiListItemButton: {
			...c?.MuiListItemButton,
			styleOverrides: {
				...c?.MuiListItemButton?.styleOverrides,
				root: [c?.MuiListItemButton?.styleOverrides?.root, {
					[`&.${listItemButtonClasses.focusVisible}, &:hover`]: { [HCM]: {
						forcedColorAdjust: "none",
						color: hcTokens.activeText,
						backgroundColor: hcTokens.activeBackground
					} },
					[`&.${listItemButtonClasses.selected}`]: { [HCM]: {
						forcedColorAdjust: "none",
						color: hcTokens.selectedText,
						backgroundColor: hcTokens.selectedBackground
					} },
					[`&.${listItemButtonClasses.selected}.${listItemButtonClasses.focusVisible}, &.${listItemButtonClasses.selected}:hover`]: { [HCM]: {
						color: hcTokens.activeText,
						backgroundColor: hcTokens.activeBackground
					} }
				}]
			}
		},
		MuiNativeSelect: {
			...c?.MuiNativeSelect,
			styleOverrides: {
				...c?.MuiNativeSelect?.styleOverrides,
				icon: [c?.MuiNativeSelect?.styleOverrides?.icon, { [`&.${nativeSelectClasses.disabled}`]: { [HCM]: { color: hcTokens.disabled } } }]
			}
		},
		MuiOutlinedInput: {
			...c?.MuiOutlinedInput,
			styleOverrides: {
				...c?.MuiOutlinedInput?.styleOverrides,
				root: [c?.MuiOutlinedInput?.styleOverrides?.root, {
					[`&.${outlinedInputClasses.error} .${outlinedInputClasses.notchedOutline}`]: { [HCM]: { borderColor: hcTokens.error } },
					[`&.${outlinedInputClasses.disabled} .${outlinedInputClasses.notchedOutline}`]: { [HCM]: { borderColor: hcTokens.disabled } },
					[`&.${outlinedInputClasses.disabled}`]: { [HCM]: { color: hcTokens.disabled } }
				}]
			}
		},
		MuiRadio: {
			...c?.MuiRadio,
			styleOverrides: {
				...c?.MuiRadio?.styleOverrides,
				root: [c?.MuiRadio?.styleOverrides?.root, { [`&.${radioClasses.disabled}`]: { [HCM]: { color: hcTokens.disabled } } }]
			}
		},
		MuiSlider: {
			...c?.MuiSlider,
			styleOverrides: {
				...c?.MuiSlider?.styleOverrides,
				track: [c?.MuiSlider?.styleOverrides?.track, ({ ownerState }) => ({ ...ownerState.disabled && { [HCM]: { borderColor: hcTokens.disabled } } })],
				thumb: [c?.MuiSlider?.styleOverrides?.thumb, { [`&.${sliderClasses.disabled}`]: { [HCM]: { borderColor: hcTokens.disabled } } }]
			}
		},
		MuiSwitch: {
			...c?.MuiSwitch,
			styleOverrides: {
				...c?.MuiSwitch?.styleOverrides,
				track: [c?.MuiSwitch?.styleOverrides?.track, ({ ownerState }) => ({ ...ownerState.disabled && { [HCM]: { borderColor: hcTokens.disabled } } })],
				thumb: [c?.MuiSwitch?.styleOverrides?.thumb, ({ ownerState }) => ({ ...ownerState.disabled && { [HCM]: { borderColor: hcTokens.disabled } } })]
			}
		},
		MuiButtonBase: {
			...c?.MuiButtonBase,
			styleOverrides: {
				...c?.MuiButtonBase?.styleOverrides,
				root: [c?.MuiButtonBase?.styleOverrides?.root, { [HCM]: { "&:focus-visible, &:focus-within:has(input:focus-visible)": { outline: `5px auto ${hcTokens.activeBackground}` } } }]
			}
		},
		MuiTooltip: {
			...c?.MuiTooltip,
			styleOverrides: {
				...c?.MuiTooltip?.styleOverrides,
				tooltip: [c?.MuiTooltip?.styleOverrides?.tooltip, { [HCM]: { border: `1px solid ${hcTokens.buttonText}` } }]
			}
		},
		MuiToggleButton: {
			...c?.MuiToggleButton,
			styleOverrides: {
				...c?.MuiToggleButton?.styleOverrides,
				root: [c?.MuiToggleButton?.styleOverrides?.root, { [`&.${toggleButtonClasses.selected}`]: {
					[HCM]: {
						forcedColorAdjust: "none",
						color: hcTokens.activeText,
						backgroundColor: hcTokens.activeBackground,
						borderColor: hcTokens.activeBackground
					},
					"&:hover": { [HCM]: {
						backgroundColor: hcTokens.activeBackground,
						borderColor: hcTokens.buttonBorder
					} }
				} }]
			}
		}
	};
	return theme;
}
//#endregion
//#region node_modules/@mui/material/styles/createMuiStrictModeTheme.mjs
function createMuiStrictModeTheme(options, ...args) {
	return createTheme$1(deepmerge({ unstable_strictMode: true }, options), ...args);
}
//#endregion
//#region node_modules/@mui/material/styles/createStyles.mjs
var warnedOnce$2 = false;
function createStyles(styles) {
	if (!warnedOnce$2) {
		console.warn(["MUI: createStyles from @mui/material/styles is deprecated.", "Please use @mui/styles/createStyles"].join("\n"));
		warnedOnce$2 = true;
	}
	return styles;
}
//#endregion
//#region node_modules/@mui/material/styles/cssUtils.mjs
function isUnitless(value) {
	return String(parseFloat(value)).length === String(value).length;
}
function getUnit(input) {
	return String(input).match(/[\d.\-+]*\s*(.*)/)[1] || "";
}
function toUnitless(length) {
	return parseFloat(length);
}
function convertLength(baseFontSize) {
	return (length, toUnit) => {
		const fromUnit = getUnit(length);
		if (fromUnit === toUnit) return length;
		let pxLength = toUnitless(length);
		if (fromUnit !== "px") {
			if (fromUnit === "em") pxLength = toUnitless(length) * toUnitless(baseFontSize);
			else if (fromUnit === "rem") pxLength = toUnitless(length) * toUnitless(baseFontSize);
		}
		let outputLength = pxLength;
		if (toUnit !== "px") if (toUnit === "em") outputLength = pxLength / toUnitless(baseFontSize);
		else if (toUnit === "rem") outputLength = pxLength / toUnitless(baseFontSize);
		else return length;
		return parseFloat(outputLength.toFixed(5)) + toUnit;
	};
}
function alignProperty({ size, grid }) {
	const sizeBelow = size - size % grid;
	const sizeAbove = sizeBelow + grid;
	return size - sizeBelow < sizeAbove - size ? sizeBelow : sizeAbove;
}
function fontGrid({ lineHeight, pixels, htmlFontSize }) {
	return pixels / (lineHeight * htmlFontSize);
}
/**
* generate a responsive version of a given CSS property
* @example
* responsiveProperty({
*   cssProperty: 'fontSize',
*   min: 15,
*   max: 20,
*   unit: 'px',
*   breakpoints: [300, 600],
* })
*
* // this returns
*
* {
*   fontSize: '15px',
*   '@media (min-width:300px)': {
*     fontSize: '17.5px',
*   },
*   '@media (min-width:600px)': {
*     fontSize: '20px',
*   },
* }
* @param {Object} params
* @param {string} params.cssProperty - The CSS property to be made responsive
* @param {number} params.min - The smallest value of the CSS property
* @param {number} params.max - The largest value of the CSS property
* @param {string} [params.unit] - The unit to be used for the CSS property
* @param {Array.number} [params.breakpoints]  - An array of breakpoints
* @param {number} [params.alignStep] - Round scaled value to fall under this grid
* @returns {Object} responsive styles for {params.cssProperty}
*/
function responsiveProperty({ cssProperty, min, max, unit = "rem", breakpoints = [
	600,
	900,
	1200
], transform = null }) {
	const output = { [cssProperty]: `${min}${unit}` };
	const factor = (max - min) / breakpoints[breakpoints.length - 1];
	breakpoints.forEach((breakpoint) => {
		let value = min + factor * breakpoint;
		if (transform !== null) value = transform(value);
		output[`@media (min-width:${breakpoint}px)`] = { [cssProperty]: `${Math.round(value * 1e4) / 1e4}${unit}` };
	});
	return output;
}
//#endregion
//#region node_modules/@mui/material/styles/responsiveFontSizes.mjs
function responsiveFontSizes(themeInput, options = {}) {
	const { breakpoints = [
		"sm",
		"md",
		"lg"
	], disableAlign = false, factor = 2, variants = [
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"subtitle1",
		"subtitle2",
		"body1",
		"body2",
		"caption",
		"button",
		"overline"
	] } = options;
	const theme = { ...themeInput };
	theme.typography = { ...theme.typography };
	const typography = theme.typography;
	const convert = convertLength(typography.htmlFontSize);
	const breakpointValues = breakpoints.map((x) => theme.breakpoints.values[x]);
	variants.forEach((variant) => {
		const style = typography[variant];
		if (!style) return;
		const remFontSize = parseFloat(convert(style.fontSize, "rem"));
		if (remFontSize <= 1) return;
		const maxFontSize = remFontSize;
		const minFontSize = 1 + (maxFontSize - 1) / factor;
		let { lineHeight } = style;
		if (!isUnitless(lineHeight) && !disableAlign) throw new Error("MUI: Unsupported non-unitless line height with grid alignment.\nUse unitless line heights instead.");
		if (!isUnitless(lineHeight)) lineHeight = parseFloat(convert(lineHeight, "rem")) / parseFloat(remFontSize);
		let transform = null;
		if (!disableAlign) transform = (value) => alignProperty({
			size: value,
			grid: fontGrid({
				pixels: 4,
				lineHeight,
				htmlFontSize: typography.htmlFontSize
			})
		});
		const responsive = responsiveProperty({
			cssProperty: "fontSize",
			min: minFontSize,
			max: maxFontSize,
			unit: "rem",
			breakpoints: breakpointValues,
			transform
		});
		if (breakpointValues.length > 0) {
			const lastBreakpoint = breakpointValues[breakpointValues.length - 1];
			responsive[`@media (min-width:${lastBreakpoint}px)`] = { fontSize: `${Math.round(maxFontSize * 1e4) / 1e4}rem` };
		}
		typography[variant] = {
			...style,
			...responsive
		};
	});
	return theme;
}
//#endregion
//#region node_modules/@mui/material/styles/useThemeProps.mjs
function useThemeProps({ props, name }) {
	return useThemeProps$1({
		props,
		name,
		defaultTheme: defaultTheme$1,
		themeId: identifier_default
	});
}
//#endregion
//#region node_modules/@mui/material/styles/ThemeProviderNoVars.mjs
function ThemeProviderNoVars({ theme: themeInput, ...props }) {
	const scopedTheme = "$$material" in themeInput ? themeInput[identifier_default] : void 0;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ThemeProvider$1, {
		...props,
		themeId: scopedTheme ? identifier_default : void 0,
		theme: scopedTheme || themeInput
	});
}
//#endregion
//#region node_modules/@mui/material/InitColorSchemeScript/InitColorSchemeScript.mjs
var defaultConfig = {
	attribute: "data-mui-color-scheme",
	colorSchemeStorageKey: "mui-color-scheme",
	defaultLightColorScheme: "light",
	defaultDarkColorScheme: "dark",
	modeStorageKey: "mui-mode"
};
/**
*
* Demos:
*
* - [InitColorSchemeScript](https://mui.com/material-ui/react-init-color-scheme-script/)
*
* API:
*
* - [InitColorSchemeScript API](https://mui.com/material-ui/api/init-color-scheme-script/)
*/
function InitColorSchemeScript(props) {
	const { defaultMode = "system", defaultLightColorScheme = defaultConfig.defaultLightColorScheme, defaultDarkColorScheme = defaultConfig.defaultDarkColorScheme, modeStorageKey = defaultConfig.modeStorageKey, colorSchemeStorageKey = defaultConfig.colorSchemeStorageKey, attribute: initialAttribute = defaultConfig.attribute, colorSchemeNode = "document.documentElement", nonce } = props;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(InitColorSchemeScript$1, {
		defaultMode,
		defaultLightColorScheme,
		defaultDarkColorScheme,
		modeStorageKey,
		colorSchemeStorageKey,
		attribute: initialAttribute,
		colorSchemeNode,
		nonce
	});
}
InitColorSchemeScript.propTypes = {
	/**
	* DOM attribute for applying a color scheme.
	* @default 'data-mui-color-scheme'
	* @example '.mode-%s' // for class based color scheme
	* @example '[data-mode-%s]' // for data-attribute without '='
	*/
	attribute: import_prop_types.default.string,
	/**
	* The node (provided as string) used to attach the color-scheme attribute.
	* @default 'document.documentElement'
	*/
	colorSchemeNode: import_prop_types.default.string,
	/**
	* localStorage key used to store `colorScheme`.
	* @default 'mui-color-scheme'
	*/
	colorSchemeStorageKey: import_prop_types.default.string,
	/**
	* The default color scheme to be used in dark mode.
	* @default 'dark'
	*/
	defaultDarkColorScheme: import_prop_types.default.string,
	/**
	* The default color scheme to be used in light mode.
	* @default 'light'
	*/
	defaultLightColorScheme: import_prop_types.default.string,
	/**
	* The default mode when the storage is empty (user's first visit).
	* @default 'system'
	*/
	defaultMode: import_prop_types.default.oneOf([
		"dark",
		"light",
		"system"
	]),
	/**
	* localStorage key used to store `mode`.
	* @default 'mui-mode'
	*/
	modeStorageKey: import_prop_types.default.string,
	/**
	* Nonce string to pass to the inline script for CSP headers.
	*/
	nonce: import_prop_types.default.string
};
//#endregion
//#region node_modules/@mui/material/styles/ThemeProviderWithVars.mjs
var { CssVarsProvider: InternalCssVarsProvider, useColorScheme, getInitColorSchemeScript: deprecatedGetInitColorSchemeScript } = createCssVarsProvider({
	themeId: identifier_default,
	theme: () => createTheme$1({ cssVariables: true }),
	colorSchemeStorageKey: defaultConfig.colorSchemeStorageKey,
	modeStorageKey: defaultConfig.modeStorageKey,
	defaultColorScheme: {
		light: defaultConfig.defaultLightColorScheme,
		dark: defaultConfig.defaultDarkColorScheme
	},
	resolveTheme: (theme) => {
		const newTheme = {
			...theme,
			typography: createTypography(theme.palette, theme.typography)
		};
		newTheme.unstable_sx = function sx(props) {
			return styleFunctionSx_default({
				sx: props,
				theme: this
			});
		};
		return newTheme;
	}
});
var warnedOnce$1 = false;
function Experimental_CssVarsProvider(props) {
	if (!warnedOnce$1) {
		console.warn([
			"MUI: The Experimental_CssVarsProvider component has been ported into ThemeProvider.",
			"",
			"You should use `import { ThemeProvider } from '@mui/material/styles'` instead.",
			"For more details, check out https://mui.com/material-ui/customization/css-theme-variables/usage/"
		].join("\n"));
		warnedOnce$1 = true;
	}
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(InternalCssVarsProvider, { ...props });
}
var warnedInitScriptOnce = false;
var getInitColorSchemeScript = (params) => {
	if (!warnedInitScriptOnce) {
		console.warn([
			"MUI: The getInitColorSchemeScript function has been deprecated.",
			"",
			"You should use `import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'`",
			"and replace the function call with `<InitColorSchemeScript />` instead."
		].join("\n"));
		warnedInitScriptOnce = true;
	}
	return deprecatedGetInitColorSchemeScript(params);
};
/**
* TODO: remove this export in v7
* @deprecated
* The `CssVarsProvider` component has been deprecated and ported into `ThemeProvider`.
*
* You should use `ThemeProvider` and `createTheme()` instead:
*
* ```diff
* - import { CssVarsProvider, extendTheme } from '@mui/material/styles';
* + import { ThemeProvider, createTheme } from '@mui/material/styles';
*
* - const theme = extendTheme();
* + const theme = createTheme({
* +   cssVariables: true,
* +   colorSchemes: { light: true, dark: true },
* + });
*
* - <CssVarsProvider theme={theme}>
* + <ThemeProvider theme={theme}>
* ```
*
* To see the full documentation, check out https://mui.com/material-ui/customization/css-theme-variables/usage/.
*/
var CssVarsProvider = InternalCssVarsProvider;
//#endregion
//#region node_modules/@mui/material/styles/ThemeProvider.mjs
function ThemeProvider({ theme, ...props }) {
	const noVarsTheme = import_react.useMemo(() => {
		if (typeof theme === "function") return theme;
		const muiTheme = "$$material" in theme ? theme[identifier_default] : theme;
		if (!("colorSchemes" in muiTheme)) {
			if (!("vars" in muiTheme)) return {
				...theme,
				vars: null
			};
			return theme;
		}
		return null;
	}, [theme]);
	if (noVarsTheme) return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ThemeProviderNoVars, {
		theme: noVarsTheme,
		...props
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(CssVarsProvider, {
		theme,
		...props
	});
}
//#endregion
//#region node_modules/@mui/material/styles/makeStyles.mjs
function makeStyles() {
	throw new Error("MUI: makeStyles is no longer exported from @mui/material/styles.\nYou have to import it from @mui/styles.\nSee https://mui.com/r/migration-v4/#mui-material-styles for more details.");
}
//#endregion
//#region node_modules/@mui/material/styles/withStyles.mjs
function withStyles() {
	throw new Error("MUI: withStyles is no longer exported from @mui/material/styles.\nYou have to import it from @mui/styles.\nSee https://mui.com/r/migration-v4/#mui-material-styles for more details.");
}
//#endregion
//#region node_modules/@mui/material/styles/withTheme.mjs
function withTheme() {
	throw new Error("MUI: withTheme is no longer exported from @mui/material/styles.\nYou have to import it from @mui/styles.\nSee https://mui.com/r/migration-v4/#mui-material-styles for more details.");
}
//#endregion
//#region node_modules/@mui/material/styles/experimental_extendTheme.mjs
var warnedOnce = false;
function deprecatedExtendTheme(...args) {
	if (!warnedOnce) {
		console.warn([
			"MUI: The `experimental_extendTheme` has been stabilized.",
			"",
			"You should use `import { extendTheme } from '@mui/material/styles'`"
		].join("\n"));
		warnedOnce = true;
	}
	return createThemeWithVars(...args);
}
//#endregion
//#region node_modules/@mui/material/styles/index.mjs
function experimental_sx() {
	throw new Error("MUI: The `experimental_sx` has been moved to `theme.unstable_sx`.For more details, see https://github.com/mui/material-ui/pull/35150.");
}
//#endregion
//#region node_modules/@mui/utils/requirePropFactory/requirePropFactory.mjs
function requirePropFactory(componentNameInError, Component) {
	const prevPropTypes = Component ? { ...Component.propTypes } : null;
	const requireProp = (requiredProp) => (props, propName, componentName, location, propFullName, ...args) => {
		const propFullNameSafe = propFullName || propName;
		const defaultTypeChecker = prevPropTypes?.[propFullNameSafe];
		if (defaultTypeChecker) {
			const typeCheckerResult = defaultTypeChecker(props, propName, componentName, location, propFullName, ...args);
			if (typeCheckerResult) return typeCheckerResult;
		}
		if (typeof props[propName] !== "undefined" && !props[requiredProp]) return /* @__PURE__ */ new Error(`The prop \`${propFullNameSafe}\` of \`${componentNameInError}\` can only be used together with the \`${requiredProp}\` prop.`);
		return null;
	};
	return requireProp;
}
//#endregion
//#region node_modules/@mui/material/utils/requirePropFactory.mjs
var requirePropFactory_default = requirePropFactory;
//#endregion
//#region node_modules/@mui/material/Grid/Grid.mjs
/**
*
* Demos:
*
* - [Grid](https://mui.com/material-ui/react-grid/)
*
* API:
*
* - [Grid API](https://mui.com/material-ui/api/grid/)
*/
var Grid = createGrid({
	createStyledComponent: styled$1("div", {
		name: "MuiGrid",
		slot: "Root",
		overridesResolver: (props, styles) => {
			const { ownerState } = props;
			return [styles.root, ownerState.container && styles.container];
		}
	}),
	componentName: "MuiGrid",
	useThemeProps: (inProps) => useDefaultProps({
		props: inProps,
		name: "MuiGrid"
	}),
	useTheme: useTheme$1
});
Grid.propTypes = {
	/**
	* The content of the component.
	*/
	children: import_prop_types.default.node,
	/**
	* The number of columns.
	* @default 12
	*/
	columns: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.number),
		import_prop_types.default.number,
		import_prop_types.default.object
	]),
	/**
	* Defines the horizontal space between the type `item` components.
	* It overrides the value of the `spacing` prop.
	*/
	columnSpacing: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string])),
		import_prop_types.default.number,
		import_prop_types.default.object,
		import_prop_types.default.string
	]),
	/**
	* If `true`, the component will have the flex *container* behavior.
	* You should be wrapping *items* with a *container*.
	* @default false
	*/
	container: import_prop_types.default.bool,
	/**
	* Defines the `flex-direction` style property for the container.
	*
	* ⚠️ Only `row` and `row-reverse` are supported. `column` and `column-reverse` are not supported,
	* because the Grid component is designed to subdivide layouts into **columns**, not rows.
	*
	* For vertical layouts, use `Stack` instead.
	*
	* @default 'row'
	*/
	direction: import_prop_types.default.oneOfType([
		import_prop_types.default.oneOf(["row-reverse", "row"]),
		import_prop_types.default.arrayOf(import_prop_types.default.oneOf(["row-reverse", "row"])),
		import_prop_types.default.object
	]),
	/**
	* Defines the offset value for the type `item` components.
	*/
	offset: import_prop_types.default.oneOfType([
		import_prop_types.default.string,
		import_prop_types.default.number,
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.number])),
		import_prop_types.default.object
	]),
	/**
	* Defines the vertical space between the type `item` components.
	* It overrides the value of the `spacing` prop.
	*/
	rowSpacing: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string])),
		import_prop_types.default.number,
		import_prop_types.default.object,
		import_prop_types.default.string
	]),
	/**
	* Defines the size of the the type `item` components.
	*/
	size: import_prop_types.default.oneOfType([
		import_prop_types.default.string,
		import_prop_types.default.bool,
		import_prop_types.default.number,
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.string,
			import_prop_types.default.bool,
			import_prop_types.default.number
		])),
		import_prop_types.default.object
	]),
	/**
	* Defines the space between the type `item` components.
	* It can only be used on a type `container` component.
	* @default 0
	*/
	spacing: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string])),
		import_prop_types.default.number,
		import_prop_types.default.object,
		import_prop_types.default.string
	]),
	/**
	* @ignore
	*/
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	/**
	* @internal
	* The level of the grid starts from `0` and increases when the grid nests
	* inside another grid. Nesting is defined as a container Grid being a direct
	* child of a container Grid.
	*
	* ```js
	* <Grid container> // level 0
	*   <Grid container> // level 1
	*     <Grid container> // level 2
	* ```
	*
	* Only consecutive grid is considered nesting. A grid container will start at
	* `0` if there are non-Grid container element above it.
	*
	* ```js
	* <Grid container> // level 0
	*   <div>
	*     <Grid container> // level 0
	* ```
	*
	* ```js
	* <Grid container> // level 0
	*   <Grid>
	*     <Grid container> // level 0
	* ```
	*/
	unstable_level: import_prop_types.default.number,
	/**
	* Defines the `flex-wrap` style property.
	* It's applied for all screen sizes.
	* @default 'wrap'
	*/
	wrap: import_prop_types.default.oneOf([
		"nowrap",
		"wrap-reverse",
		"wrap"
	])
};
{
	const Component = Grid;
	const requireProp = requirePropFactory_default("Grid", Component);
	Component["propTypes"] = {
		...Component.propTypes,
		direction: requireProp("container"),
		spacing: requireProp("container"),
		wrap: requireProp("container")
	};
}
//#endregion
//#region node_modules/@mui/material/Grid/gridClasses.mjs
function getGridUtilityClass(slot) {
	return generateUtilityClass("MuiGrid", slot);
}
var SPACINGS = [
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10
];
var DIRECTIONS = ["row-reverse", "row"];
var WRAPS = [
	"nowrap",
	"wrap-reverse",
	"wrap"
];
var GRID_SIZES = [
	"auto",
	true,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12
];
var gridClasses = generateUtilityClasses("MuiGrid", [
	"root",
	"container",
	...SPACINGS.map((spacing) => `spacing-xs-${spacing}`),
	...DIRECTIONS.map((direction) => `direction-xs-${direction}`),
	...WRAPS.map((wrap) => `wrap-xs-${wrap}`),
	...GRID_SIZES.map((size) => `grid-xs-${size}`),
	...GRID_SIZES.map((size) => `grid-sm-${size}`),
	...GRID_SIZES.map((size) => `grid-md-${size}`),
	...GRID_SIZES.map((size) => `grid-lg-${size}`),
	...GRID_SIZES.map((size) => `grid-xl-${size}`)
]);
//#endregion
export { accordionSummaryClasses as $, outlinedInputClasses as A, getFormLabelUtilityClasses as B, getToggleButtonUtilityClass as C, getRadioUtilityClass as D, sliderClasses as E, getListItemButtonUtilityClass as F, filledInputClasses as G, getFormHelperTextUtilityClasses as H, listItemButtonClasses as I, inputBaseClasses as J, getFilledInputUtilityClass as K, getInputUtilityClass as L, nativeSelectClasses as M, getMenuItemUtilityClass as N, radioClasses as O, menuItemClasses as P, getAutocompleteUtilityClass as Q, inputClasses as R, enhanceHighContrast as S, getSliderUtilityClass as T, formControlLabelClasses as U, formHelperTextClasses as V, getFormControlLabelUtilityClasses as W, getCheckboxUtilityClass as X, checkboxClasses as Y, autocompleteClasses as Z, responsiveFontSizes as _, experimental_sx as a, createStyles as b, withStyles as c, CssVarsProvider as d, getAccordionSummaryUtilityClass as et, Experimental_CssVarsProvider as f, useThemeProps as g, InitColorSchemeScript as h, requirePropFactory_default as i, getNativeSelectUtilityClasses as j, getOutlinedInputUtilityClass as k, makeStyles as l, useColorScheme as m, gridClasses as n, isMuiElement as nt, deprecatedExtendTheme as o, getInitColorSchemeScript as p, getInputBaseUtilityClass as q, Grid as r, withTheme as s, getGridUtilityClass as t, adaptV4Theme as tt, ThemeProvider as u, getUnit as v, toggleButtonClasses as w, createMuiStrictModeTheme as x, toUnitless as y, formLabelClasses as z };

//# sourceMappingURL=Grid-LdUc-LFx.js.map