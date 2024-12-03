/**
 * Interface representing data to send to the iframe.
 */
export interface IframeData {
  /**
   * Whether to show the color picker in the UI.
   */
  showColorPicker?: boolean;

  /**
   * Whether to display preset colors set for loaded template.
   */
  showColorPresets?: boolean;

  /**
   * Allows users to upload design files.
   */
  enableDesignFileUpload?: boolean;

  /**
   * Restricts the user to one color per smart object.
   */
  oneColorPerSmartObject?: boolean;

  /**
   * Options for exporting mockups.
   */
  mockupExportOptions?: {
    /**
     * The format of the exported image (e.g., "webp", "png" or "jpg").
     */
    image_format: "webp" | "png" | "jpg";

    /**
     * The size of the exported image in pixels.
     */
    image_size: number;
  };

  /**
   * The URL of the design file to load in the iframe.
   */
  designUrl?: string;

  /**
   * Custom data fields as a JSON string (will be returned as is with callback data).
   */
  customFields?: string;

  /**
   * A unique key to identify the website making the request.
   */
  "x-website-key": string;
}

/**
 * Response structure for iframe communication.
 */
export interface IframeResponse {
  /**
   * Array of mockup export data.
   */
  mockupsExport: {
    /**
     * Label for the exported mockup.
     */
    export_label: string;

    /**
     * Path or URL to the exported mockup file.
     */
    export_path: string;
  }[];

  /**
   * Custom data fields as a string (optional).
   */
  customFields?: string;

  /**
   * Array of artwork data (optional).
   */
  artworks?: {
    /**
     * UUID of the smart object in the artwork.
     */
    smartObjectUUID: string;

    /**
     * File representing the artwork (optional).
     */
    file?: File;

    /**
     * URL of the artwork file (optional).
     */
    url?: string;

    /**
     * Configuration data for the artwork's placement (optional).
     */
    configData?: {
      /**
       * Width of the artwork in pixels.
       */
      width: number;

      /**
       * Height of the artwork in pixels.
       */
      height: number;

      /**
       * Rotation angle of the artwork in degrees.
       */
      rotate: number;

      /**
       * Left offset of the artwork in pixels.
       */
      left: number;

      /**
       * Top offset of the artwork in pixels.
       */
      top: number;
    };

    /**
     * Base64-encoded string representing the artwork file (optional).
     */
    fileBase64?: string;
  }[];
}

/**
 * Parameters for initializing the iframe communication.
 */
export interface InitDynamicMockupsIframeParams {
  /**
   * The ID of the iframe element to target.
   */
  iframeId: string;

  /**
   * The data to be sent to the iframe during initialization.
   */
  data: IframeData;

  /**
   * The mode of operation for the iframe.
   * - `"download"`: Allows users to download the mockup.
   * - `"custom"`: Enables custom behavior within the iframe.
   */
  mode: "download" | "custom";

  /**
   * Optional callback function to handle responses from the iframe.
   *
   * @param response - The response data sent back from the iframe.
   */
  callback?: (response: IframeResponse) => void;
}

/**
 * Initializes iframe communication with the specified parameters.
 * @param params - The parameters for initializing the iframe.
 */
export declare const initDynamicMockupsIframe: ({
  iframeId,
  data,
  mode,
  callback,
}: InitDynamicMockupsIframeParams) => void;