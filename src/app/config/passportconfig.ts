import passport, { Profile } from "passport";
import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth20";
import { envVars } from "./config";
import { User } from "../modules/user/model.user";
import { ISACTIVE, ROLE } from "../modules/user/interface.user";

passport.use(
  new GoogleStrategy(
    {
      clientID: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
      callbackURL: envVars.CALLBACK_URL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email =
          profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : undefined;
        if (!email) {
          return done(null, false, { message: "Email Not Found" });
        }
        let user = await User.findOne({ email: email });
        if (!user) {
          user = await User.create({
            email: email,
            name: profile.displayName,
            picture:
              profile.photos && profile.photos.length > 0
                ? profile.photos[0].value
                : undefined,
            isActive: ISACTIVE.ACTIVE,
            isVerified: true,
            isDeleted: false,
            bookings: [],
            role: ROLE.USER,
            auths: [
              {
                provider: "google",
                providerId: profile.id,
              },
            ],
          });
        }
        return done(null, user, { message: "User Loggedin Successfully" });
      } catch (error) {
        return done(error, false, { message: `Passport Error ${error}` });
      }

      // const user=User.
    }
  )
);

// Serialize user into the session (store user id)
passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

// Deserialize user from the session (fetch full user from DB)
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
