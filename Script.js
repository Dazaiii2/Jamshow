import android.media.audiofx.DynamicsProcessing;
import android.media.audiofx.DynamicsProcessing.Config;
import android.media.audiofx.DynamicsProcessing.Mbc;

// This function sets up a "Stabilizer" to keep instruments balanced
public void setupSoundStabilizer(int audioSessionId) {
    // 1. Create a configuration for dynamics (Compression)
    DynamicsProcessing.Config.Builder builder = new DynamicsProcessing.Config.Builder(
        DynamicsProcessing.VARIANT_FAVORITE_PARTICLE_SIZE,
        1,      // Single channel
        true,   // Pre-processor enabled
        1,      // Multiband compressor count
        true,   // Post-processor enabled
        1,      // Limiter count
        true    // Setup for live audio
    );

    DynamicsProcessing dp = new DynamicsProcessing(audioSessionId, builder.build());

    // 2. Configure the Compressor (The "Same Room" logic)
    // This prevents the drums from drowning out the vocals
    DynamicsProcessing.Mbc mbc = dp.getMbcBandConfig(0, 0);
    mbc.setThreshold(-20.0f); // Level out sounds above -20dB
    mbc.setRatio(10.0f);      // Strong compression for consistency
    mbc.setAttackTime(3.0f);  // Fast attack to catch loud hits
    mbc.setReleaseTime(100.0f); 

    dp.setEnabled(true);
}

