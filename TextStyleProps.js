import { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import ColorPicker from "./ColorPicker";
import CustomPicker from "./CustomPicker";
import CustomSlider from "./CustomSlider";
import CustomSwitch from "./CustomSwitch";

const fontStyles = ["normal", "italic"];
const fontVariants = [
  undefined,
  "small-caps",
  "oldstyle-nums",
  "lining-nums",
  "tabular-nums",
  "proportional-nums",
];
const fontWeights = [
  "normal",
  "bold",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
];
const textAlignments = ["auto", "left", "right", "center", "justify"];
const textDecorationLines = ["none", "underline", "line-through", "underline line-through"];
const textDecorationStyles = ["solid", "double", "dotted", "dashed"];
const textTransformations = ["none", "uppercase", "lowercase", "capitalize"];
const textAlignmentsVertical = ["auto", "top", "bottom", "center"];
const writingDirections = ["auto", "ltr", "rtl"];

//Colors
const colors = ["#767577","#fff", "red", "#f9a33a", "#0c0b0b", "#f8d99c", "#DAA520"];

const TextStyleProps = () => {
  //Backgrounds
  const [bg1, setBg1] = useState(0);
  const [bg2, setBg2] = useState(0);

  //Fonts
  const [fontSize, setFontSize] = useState(20);
  const [fontStyleIdx, setFontStyleIdx] = useState(0);
  const [fontWeightIdx, setFontWeightIdx] = useState(0);
  const [textAlignIdx, setTextAlignIdx] = useState(0);
  const [textDecorationLineIdx, setTextDecorationLineIdx] = useState(0);
  const [includeFontPadding, setIncludeFontPadding] = useState(false);
  const [textVerticalAlignIdx, setTextVerticalAlignIdx] = useState(0);
  const [fontVariantIdx, setFontVariantIdx] = useState(0);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [textDecorationStyleIdx, setTextDecorationStyleIdx] = useState(0);
  const [textTransformIdx, setTextTransformIdx] = useState(0);
  const [writingDirectionIdx, setWritingDirectionIdx] = useState(0);
  const [textShadowRadius, setTextShadowRadius] = useState(0);
  const [textColor, setTextColor] = useState(0);
  const [textShadowOffset, setTextShadowOffset] = useState({
    height: 0,
    width: 0,
  });
  const [showLabel, setShowLabel] = useState(true);

  const [, ...validFontVariants] = fontVariants;

  const { top } = useSafeAreaInsets();
  const absOffset = { marginTop: top };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.banner, absOffset]}>
        <View style={[styles.blackBox, { backgroundColor: colors[bg1] }]}>
          {showLabel && <Text>BG-1</Text>}
        </View>
        <View style={[styles.orangeBox, { backgroundColor: colors[bg2] }]}>
          {showLabel && <Text>BG-2</Text>}
        </View>
      </View>

      <View style={[styles.pargraphWrapper, absOffset]}>
        <Text
          style={[
            styles.paragraph,
            {
              fontSize,
              fontStyle: fontStyles[fontStyleIdx],
              fontWeight: fontWeights[fontWeightIdx],
              lineHeight: fontSize * 1.15,
              textAlign: textAlignments[textAlignIdx],
              textDecorationLine: textDecorationLines[textDecorationLineIdx],
              textTransform: textTransformations[textTransformIdx],
              textAlignVertical: textAlignmentsVertical[textVerticalAlignIdx],
              fontVariant:
                fontVariantIdx === 0 ? undefined : [validFontVariants[fontVariantIdx - 1]],
              letterSpacing,
              includeFontPadding,
              textDecorationStyle: textDecorationStyles[textDecorationStyleIdx],
              writingDirection: writingDirections[writingDirectionIdx],
              textShadowOffset,
              textShadowRadius,
              color: colors[textColor],
            },
          ]}
        >
          Aback-us
        </Text>
      </View>

      <ScrollView style={{ paddingHorizontal: 12, marginTop: 300 }}>
        <View>
          <CustomSwitch
            label="Labels"
            handleValueChange={() => setShowLabel((q) => !q)}
            value={showLabel}
          />
          <ColorPicker label="BG-1" data={colors} currentIndex={bg1} onSelected={setBg1} />
          <ColorPicker label="BG-2" data={colors} currentIndex={bg2} onSelected={setBg2} />
          <ColorPicker
            label="Text Color"
            data={colors}
            currentIndex={textColor}
            onSelected={setTextColor}
          />
          <Text>Common platform properties</Text>
          <CustomSlider
            label="Text Shadow Offset - Height"
            value={textShadowOffset.height}
            minimumValue={-40}
            maximumValue={40}
            handleValueChange={(val) => setTextShadowOffset((prev) => ({ ...prev, height: val }))}
          />
          <CustomSlider
            label="Text Shadow Offset - Width"
            value={textShadowOffset.width}
            minimumValue={-40}
            maximumValue={40}
            handleValueChange={(val) => setTextShadowOffset((prev) => ({ ...prev, width: val }))}
          />
          <CustomSlider
            label="Font Size"
            value={fontSize}
            maximumValue={120}
            handleValueChange={setFontSize}
          />
          <CustomPicker
            label="Font Style"
            data={fontStyles}
            currentIndex={fontStyleIdx}
            onSelected={setFontStyleIdx}
          />
          <CustomPicker
            label="Font Weight"
            data={fontWeights}
            currentIndex={fontWeightIdx}
            onSelected={setFontWeightIdx}
          />
          {/* <CustomSlider
            label="Line Height"
            value={lineHeight}
            minimumValue={10}
            maximumValue={150}
            handleValueChange={setLineHeight}
          /> */}
          <CustomPicker
            label="Text Align"
            data={textAlignments}
            currentIndex={textAlignIdx}
            onSelected={setTextAlignIdx}
          />
          <CustomPicker
            label="Text Decoration Line"
            data={textDecorationLines}
            currentIndex={textDecorationLineIdx}
            onSelected={setTextDecorationLineIdx}
          />
          <CustomSlider
            label="Text Shadow Radius"
            value={textShadowRadius}
            handleValueChange={setTextShadowRadius}
          />
          <CustomPicker
            label="Font Variant"
            data={fontVariants}
            currentIndex={fontVariantIdx}
            onSelected={setFontVariantIdx}
          />
          <CustomSlider
            label="Letter Spacing"
            step={0.1}
            value={letterSpacing}
            handleValueChange={setLetterSpacing}
          />
          <CustomPicker
            label="Text Transform"
            data={textTransformations}
            currentIndex={textTransformIdx}
            onSelected={setTextTransformIdx}
          />
        </View>
        {Platform.OS === "android" && (
          <View style={styles.platformContainer}>
            <Text style={styles.platformContainerTitle}>Android only properties</Text>
            <CustomPicker
              label="Text Vertical Align"
              data={textAlignmentsVertical}
              currentIndex={textVerticalAlignIdx}
              onSelected={setTextVerticalAlignIdx}
            />
            <CustomSwitch
              label="Include Font Padding"
              handleValueChange={setIncludeFontPadding}
              value={includeFontPadding}
            />
          </View>
        )}
        {Platform.OS === "ios" && (
          <View style={styles.platformContainer}>
            <Text style={styles.platformContainerTitle}>iOS only properties</Text>
            <CustomPicker
              label="Text Decoration Style"
              data={textDecorationStyles}
              currentIndex={textDecorationStyleIdx}
              onSelected={setTextDecorationStyleIdx}
            />
            <CustomPicker
              label="Writing Direction"
              data={writingDirections}
              currentIndex={writingDirectionIdx}
              onSelected={setWritingDirectionIdx}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  banner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    height: 300,
  },

  blackBox: {
    flex: 1,
  },
  orangeBox: {
    flex: 1,
  },

  pargraphWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  paragraph: {
    color: "#fff",
    backgroundColor: "transparent",
    textDecorationColor: "yellow",
    textShadowColor: "red",
    textShadowRadius: 1,
  },
  platformContainer: {
    marginTop: 8,
    borderTopWidth: 1,
  },
  platformContainerTitle: {
    marginTop: 8,
  },
});

export default TextStyleProps;
