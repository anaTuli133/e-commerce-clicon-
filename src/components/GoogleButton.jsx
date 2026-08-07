import { GoogleLogin } from "@react-oauth/google";

export default function GoogleButton({ onSuccess, onError, loading }) {
  return (
    <div className={loading ? "opacity-60 pointer-events-none" : ""}>
      <GoogleLogin
        onSuccess={(credentialResponse) => onSuccess?.(credentialResponse.credential)}
        onError={() => onError?.("Google sign-in failed. Please try again.")}
        theme="outline"
        size="large"
        width="100%"
        text="continue_with"
        shape="rectangular"
      />
    </div>
  );
}