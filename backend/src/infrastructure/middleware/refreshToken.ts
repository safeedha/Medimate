
import jwt, { JwtPayload } from 'jsonwebtoken';

export class RefreshToken {
  async refresh(refreshtoken: string): Promise<string> {
    if (!refreshtoken) {
      throw new Error("refresh token is missing");
    }

    const decoded = jwt.verify(refreshtoken, process.env.JWT_REFRESH_SECRET!);

    if (typeof decoded !== 'object' || !('id' in decoded)) {
      throw new Error("Invalid refresh token payload");
    }

    const newaccesstoken = jwt.sign(
      { id: (decoded as JwtPayload).id },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    return newaccesstoken;
  }
}