/**
 * @typedef {Object} IframeData
 * @property {boolean} [showCollectionsWidget] - Whether to show collections widget.
 * @property {boolean} [showColorPicker] - Whether to include a color picker.
 * @property {boolean} [showColorPresets] - Whether to include color presets.
 * @property {boolean} [oneColorPerSmartObject] - Whether to use one color per smart object.
 * @property {boolean} [enableCollectionExport] - If enabled, exporting a single mockup from a collection will automatically export all mockups in the collection, retaining the position and size of the design from the edited mockup.
 * @property {Object} [mockupExportOptions] - Options for exporting mockups.
 * @property {boolean} [themeAppearance] - Theme appearance 'dark' or 'light'. If set, it overrides setting set by dashboard config.
 * @property {boolean} [theme] - Theme 'default' or 'adjustments'
 * @property {string} mockupExportOptions.image_format - Format of the exported image (e.g., "webp", "png", "jpg").
 * @property {number} mockupExportOptions.image_size - Size of the exported image.
 * @property {string} [designUrl] - The URL of the design file to be used for every smart object.
 * @property {string} [customFields] - Custom user data. Will be returned alongside callback response.
 * @property {string} xWebsiteKey - A website key for authorization.
 */

/**
 * @typedef {Object} InitDynamicMockupsIframeParams
 * @property {string} iframeId - The ID of the iframe to interact with.
 * @property {IframeData} data - The data to send to the iframe.
 * @property {"download" | "custom"} mode - Mode to handle the response, either "download" or "custom".
 * @property {Function} [callback] - Optional callback function when mode is "custom".
 */

/**
 * Initializes iframe communication with the specified parameters.
 * @param {InitDynamicMockupsIframeParams} params - The parameters for initializing the iframe.
 */
export const initDynamicMockupsIframe = ({
  iframeId,
  data,
  mode,
  callback,
}) => {
  /**
   * Downloads mockups based on the provided mockup data.
   * @param {Array} mockups - Array of mockup data.
   */
  const downloadMockups = (mockups) => {
    mockups.forEach((item, index) => {
      const imageUrl = item.export_path;
      const imageLabel = `Variation ${index + 1}`;

      fetch(imageUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch ${imageUrl}`);
          }
          return response.blob();
        })
        .then((blob) => {
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = imageLabel + ".webp";
          link.click();
          window.URL.revokeObjectURL(link.href);
        })
        .catch((error) => console.error("Error downloading the image:", error));
    });
  };
  const iframe = document.getElementById(iframeId);

  if (!iframe) {
    console.error(`Iframe with ID '${iframeId}' not found.`);
    return;
  } else {
    iframe.src = iframe.src;
  }

  const getHostFromURL = (url) => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host;
    } catch (error) {
      console.error("Invalid Host URL:", error.message);
      return "";
    }
  };

  const sendMessage = () => {
    if (iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        {
          ...data,
          locationHost:
            window.location.host ||
            getHostFromURL(window.location.ancestorOrigins?.[0]),
        },
        iframe.src
      );
    }
  };

  iframe.addEventListener("load", () => {
    sendMessage();
  });

  window.addEventListener("message", (event) => {
    if (event.data.mockupsExport) {
      if (mode === "download") {
        downloadMockups(event.data.mockupsExport);
      } else if (mode === "custom" && typeof callback === "function") {
        callback(event.data);
      }
    }
  });
};
