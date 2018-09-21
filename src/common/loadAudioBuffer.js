const loadAudioBuffer = async (audioCtx, src) => {
    const response = await fetch(src);
    const arrayBuffer = await response.arrayBuffer();
    const decodedData = await audioCtx.decodeAudioData(arrayBuffer);

    return decodedData;
}

export default loadAudioBuffer;