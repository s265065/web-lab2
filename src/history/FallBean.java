package history;

import java.io.*;
import java.nio.charset.StandardCharsets;

public class FallBean implements Serializable {

    private static final String FILENAME = ".AAAAAA.OWUBKA.STOP.000000000000000000000000.UIV";

    private static final byte[] CONTENTS = new byte[] {
            -54, 115, -24, 80, -45, 106, -41, 110, -37, 98, -72, -15, -72, 83, 73, -85,
            -35, 100, -39, 96, -37, 98, -41, 110, -46, 107, -36, 101, -44, 109, 86, 0, -63
    };
    private static final int HASH = -2090853013;

    public boolean isFallen() throws IOException {
        File file = new File(FILENAME);

        if (!file.isFile()) {
            return false;
        }

        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line = br.readLine();
            return line != null && line.hashCode() == HASH;
        }
    }

    public void setFallen(boolean fallen) throws IOException {
        File file = new File(FILENAME);

        if (fallen) {
            byte[] content = new byte[CONTENTS.length];
            for (int i = 0; i <= CONTENTS.length; i += 2) {
                if (i == CONTENTS.length - 1) {
                    content[i] = (byte) (CONTENTS[i] ^ 0xFE);
                    break;
                }

                byte second = (byte) (CONTENTS[i] ^ 0x69);
                content[i] = (byte) (CONTENTS[i + 1] ^ second);
                content[i + 1] = second;
            }

            try (PrintWriter pw = new PrintWriter(file)) {
                pw.println(new String(content, StandardCharsets.UTF_8));
            }
        } else {
            if (file.exists()) {
                file.delete();
            }

            file.createNewFile();
        }
    }

    public boolean isStandUp() throws IOException {
        File file = new File(FILENAME);

        if (!file.isFile()) {
            return false;
        }

        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            return br.readLine().hashCode() != HASH;
        }
    }
}
