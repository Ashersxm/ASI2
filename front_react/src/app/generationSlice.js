import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to generate an image
export const generateImage = createAsyncThunk('generation/generateImage', async (promptTxt, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:9780/api/v1/images/generateImg', {
      promptTxt: promptTxt || 'a cute lama ninja', // Default value for promptTxt
      negativePromptTxt: "", // Default to an empty string for negativePromptTxt
    });
    return response.data; // Assuming the response contains generated image data
  } catch (error) {
    console.error("Error generating image:", error);
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

// Thunk to generate a property
export const generateProperty = createAsyncThunk('generation/generateProperty', async (promptTxt, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:9781/api/v1/properties/generateProperty', {
      promptTxt: promptTxt || 'a cute lama ninja', // Default value for promptTxt
      negativePromptTxt: "", // Default to an empty string for negativePromptTxt
    });
    return response.data; // Assuming the response contains a generated property
  } catch (error) {
    console.error("Error generating property:", error);
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

const generationSlice = createSlice({
  name: 'generation',
  initialState: {
    image: null,       // Store a single image
    property: null,    // Store a single property
    loading: false,    // Track loading state
    error: null,       // Track error state
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Image generation actions
      .addCase(generateImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateImage.fulfilled, (state, action) => {
        state.image = action.payload[0]; // Update state with the generated image
        state.loading = false;
      })
      .addCase(generateImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Property generation actions
      .addCase(generateProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateProperty.fulfilled, (state, action) => {
        state.property = action.payload[0]; // Update state with the generated property
        state.loading = false;
      })
      .addCase(generateProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default generationSlice.reducer;
