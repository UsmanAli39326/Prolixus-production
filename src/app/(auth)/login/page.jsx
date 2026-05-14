"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { validateEmail, validatePassword, sanitize } from "@/utitlis/validation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { FaGoogle } from "react-icons/fa6";
import Input from "@/components/ui/Input";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import { apiService } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Toast from "@/components/ui/Toast";
import { getLocalization } from "@/lib/getLocalization";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const { login, isLoggedIn } = useAuth();
  const [localization, setLocalization] = useState(null);

  useEffect(() => {
    const fetchLocalization = async () => {
      const data = await getLocalization();
      setLocalization(data);
    };
    fetchLocalization();
  }, []);

  // Helper to safely redirect to an internal route or fallback
  const performRedirect = (path) => {
    // Basic validation: must start with / and not be // (common open redirect trick)
    const safePath = (path && path.startsWith("/") && !path.startsWith("//")) ? path : "/dashboard";
    router.replace(safePath);
  };

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      performRedirect(searchParams.get("redirect") || "/dashboard");
    }
  }, [isLoggedIn, searchParams]);

  useEffect(() => {
    if (searchParams.get("mode") === "register") {
      setIsLogin(false);
    }
  }, [searchParams]);

  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Register state
  const [name, setName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Clear a specific field error when user types
  const clearFieldError = (field) => {
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const errors = {};

    const cleanEmail = sanitize(email);
    const cleanPassword = sanitize(password);

    if (!cleanEmail) {
      errors.email = localization?.error_email_required;
    } else if (!validateEmail(cleanEmail)) {
      errors.email = localization?.error_email_invalid;
    }

    if (!cleanPassword) {
      errors.password = localization?.error_password_required;
    } else if (!validatePassword(cleanPassword)) {
      errors.password = localization?.error_password_invalid;
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setLoading(true);
    try {
      const response = await apiService.post("/Account/login", {
        email: cleanEmail,
        password: cleanPassword,
      });

      // Store token/user data from the response using AuthContext
      if (response?.data) {
        login(response.data, response.data?.user || null);
      }

      if (!response?.success) {
        throw new Error(response || localization?.error_login_failed)
      }

      setTimeout(() => {
        performRedirect(searchParams.get("redirect") || "/dashboard");
      }, 100);
    } catch (err) {
      let errorMessage = localization?.error_login_failed;
      try {
        // If backend sent JSON string inside message → parse it
        if (typeof err.message === "string") {
          const parsed = JSON.parse(err.message);
          errorMessage = parsed?.message || errorMessage;
        }
      } catch {
        // If parsing fails, fallback to plain message
        errorMessage = err.message || errorMessage;
      }

      setError(errorMessage);

      // If error indicates unverified account, redirect to OTP page
      if (errorMessage.toLowerCase().includes("verified") || errorMessage.toLowerCase().includes("verification")) {
        router.push(`/verify-otp?email=${encodeURIComponent(cleanEmail)}&type=signup`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const errors = {};

    const cleanName = sanitize(name);
    const cleanRegEmail = sanitize(regEmail);
    const cleanRegPassword = sanitize(regPassword);
    const cleanConfirmPassword = sanitize(confirmPassword);

    if (!cleanName) {
      errors.name = localization?.error_fullname_required;
    }

    if (!cleanRegEmail) {
      errors.regEmail = "Email is required";
    } else if (!validateEmail(cleanRegEmail)) {
      errors.regEmail = localization?.error_email_invalid;
    }

    if (!cleanRegPassword) {
      errors.regPassword = "Password is required";
    } else if (!validatePassword(cleanRegPassword)) {
      errors.regPassword = localization?.error_password_length || localization?.error_password_invalid;
    }

    if (!cleanConfirmPassword) {
      errors.confirmPassword = localization?.error_confirm_password || "Please confirm your password";
    } else if (cleanRegPassword !== cleanConfirmPassword) {
      errors.confirmPassword = localization?.error_password_mismatch;
    }


    if (!agreeTerms) {
      errors.agreeTerms = localization?.error_terms_required;
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setLoading(true);
    try {
      const response = await apiService.post("/Account/SignUp", {
        name: cleanName,
        email: cleanRegEmail,
        password: cleanRegPassword,
        confirmPassword: cleanConfirmPassword,
      });
      if (!response?.success) {
        throw new Error(response || localization?.error_registration_failed)
      }

      // Redirect to OTP verification instead of just showing success toast and staying
      router.push(`/verify-otp?email=${encodeURIComponent(cleanRegEmail)}&type=signup`);
    } catch (err) {
      const raw = err.message || "";
      let friendly = localization?.error_registration_failed;

      try {
        const parsed = JSON.parse(raw);
        const msg = (parsed?.message || parsed?.title || "").toLowerCase();

        if (msg.includes("already") || msg.includes("duplicate") || msg.includes("exists")) {
          friendly = localization?.error_email_exists;
        } else if (parsed?.message || parsed?.title) {
          friendly = parsed.message || parsed.title;
        }
      } catch {
        const lower = raw.toLowerCase();
        if (lower.includes("already") || lower.includes("duplicate") || lower.includes("exists")) {
          friendly = "This email is already registered. Try logging in instead.";
        } else if (
          !lower.includes("400") &&
          !lower.includes("validationerror") &&
          !lower.includes("bad request") &&
          !lower.includes("stack") &&
          raw.length > 0 &&
          raw.length < 200
        ) {
          friendly = raw;
        }
      }

      setError(friendly);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setError("");
    setFieldErrors({});
    setIsLogin(!isLogin);
  };

  return (
    <FaderInAnimation direction="up">
      <div className="flex items-center justify-center p-4 bg-secondary min-h-screen overflow-x-hidden">
        {/* Outer frame */}
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-up">
          <div className="relative min-h-[640px]">

            {/* Forms Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">

              {/* LEFT SIDE - Login Form (visible when isLogin) */}
              <div
                className={`
                  flex items-center justify-center p-8 sm:p-12
                  transition-all duration-700 ease-in-out
                  ${isLogin ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none absolute inset-0 lg:relative lg:opacity-0"}
                `}
              >
                <div className="w-full max-w-md">
                  {/* Brand (for mobile) */}
                  <div className="lg:hidden mb-8">
                    <div className="flex items-center gap-3">
                      <Link href="/" className="shrink-0">
                        <Image
                          src="/images/new/logo-full.gif"
                          alt={localization?.brandname || "Prolixus Logo"}
                          width={160}
                          height={45}
                          className="h-12 w-auto object-contain"
                        />
                      </Link>
                      <div>
                        <div className="font-accent text-2xl text-primary">{localization?.brandname || "Prolixus"}</div>
                        <div className="text-sm text-text">{localization?.sign_in}</div>
                      </div>
                    </div>
                  </div>



                  <h1 className="text-3xl font-bold font-accent text-center text-primary">
                    {localization?.welcome || "Welcome back to"} <span className="text-accent">{localization?.brandname || "Prolixus"}</span>
                  </h1>
                  <p className="mt-2 text-center text-sm text-text">
                    {localization?.sign_in}
                  </p>

                  {error && isLogin && (
                    <p className="text-red-500 text-sm text-center mt-4">{error}</p>
                  )}

                  <form onSubmit={handleLogin} className="mt-8 space-y-4">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      label={localization?.checkout_email_label || "Email"}
                      inputClassName="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:border-primary"
                      className="w-full"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); clearFieldError("email"); }}
                      error={fieldErrors.email}
                      required
                    />

                    <Input
                      id="password"
                      name="password"
                      type="password"
                      label={localization?.security_current_password || "Password"}
                      inputClassName="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:border-primary"
                      className="w-full"
                      placeholder={localization?.security_password_placeholder || "••••••••"}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); clearFieldError("password"); }}
                      error={fieldErrors.password}
                      required
                    />

                    <div className="flex items-center justify-between pt-1">
                      <Link
                        href="/forgot-password"
                        className="text-sm font-medium text-accent hover:underline"
                      >
                        {localization?.forgot_password || "Forgot password?"}
                      </Link>

                      {/* Remember me toggle hidden
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-text">Remember me</span>
                        <label className="flex items-center gap-2 select-none cursor-pointer">
                          <Input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="hidden"
                          />
                          <span
                            className={`
                              relative w-[46px] h-[26px] rounded-full transition-colors duration-200
                              ${rememberMe ? "bg-accent/90" : "bg-primary/20"}
                            `}
                          >
                            <span
                              className={`
                                absolute top-[3px] left-[3px] w-5 h-5 rounded-full bg-white shadow-md
                                transition-transform duration-200
                                ${rememberMe ? "translate-x-5" : "translate-x-0"}
                              `}
                            />
                          </span>
                        </label>
                      </div>
                      */}
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      fullWidth
                      loading={loading}
                      loadingText="Signing in..."
                      className="mt-2 hover:bg-accent/90 cursor-pointer duration-300"
                    >
                      {localization?.account_signin || "Log in"}
                    </Button>

                    {/* OR divider and Google sign-in hidden
                    <div className="flex items-center gap-4 py-2">
                      <div className="h-px bg-divider flex-1" />
                      <div className="text-xs text-text/60">OR</div>
                      <div className="h-px bg-divider flex-1" />
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      fullWidth
                      className="border-divider bg-surface-2/50 hover:bg-accent/10 cursor-pointer duration-300"
                    >
                      <span className="flex w-full h-full items-center justify-center rounded-md text-primary">
                        <FaGoogle className="mx-2" /> Continue with Google
                      </span>
                    </Button>
                    */}

                    <p className="text-center text-sm text-text pt-2">
                      {localization?.account_donot || "Don't have an account?"}{" "}
                      <Link
                        href={`/login?mode=register${searchParams.get("redirect") ? `&redirect=${encodeURIComponent(searchParams.get("redirect"))}` : ""}`}
                        className="font-medium text-primary hover:underline"
                        onClick={(e) => { e.preventDefault(); toggleMode(); }}
                      >
                        {localization?.account_status || "Sign up"}
                      </Link>
                    </p>
                  </form>
                </div>
              </div>

              {/* RIGHT SIDE - Register Form (visible when !isLogin) */}
              <div
                className={`
                  flex items-center justify-center p-8 sm:p-12
                  transition-all duration-700 ease-in-out
                  ${!isLogin ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none absolute inset-0 lg:relative lg:opacity-0"}
                  lg:col-start-2
                `}
              >
                <div className="w-full max-w-md">
                  {/* Brand (for mobile) */}
                  <div className="lg:hidden mb-8">
                    <div className="flex items-center gap-3">
                      <Link href="/" className="flex-shrink-0">
                        <Image
                          src="/images/new/logo-full.gif"
                          alt="Prolixus Logo"
                          width={160}
                          height={45}
                          className="h-12 w-auto object-contain"
                        />
                      </Link>
                      <div>
                        <div className="font-accent text-2xl text-primary">{localization?.brandname || "Prolixus"}</div>
                        <div className="text-sm text-text">{localization?.sign_in}</div>
                      </div>
                    </div>
                  </div>



                   <h1 className="text-3xl font-bold font-accent text-center text-primary">
                    {localization?.create_account || "Create your account"} <span className="text-accent">{localization?.brandname || "Prolixus"}</span>
                  </h1>
                  <p className="mt-2 text-center text-sm text-text">
                    {localization?.join_today || "Join us and start your journey today."}
                  </p>

                  {error && !isLogin && (
                    <p className=" text-sm text-center mt-4 text-error">{error}</p>
                  )}

                  <form onSubmit={handleRegister} noValidate className="mt-8 space-y-4">
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      label={localization?.checkout_fullname_label || "Full Name"}
                      inputClassName="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:border-primary"
                      className="w-full"
                      placeholder={localization?.profile_full_name_placeholder || "John Doe"}
                      value={name}
                      onChange={(e) => { setName(e.target.value); clearFieldError("name"); }}
                      error={fieldErrors.name}
                      required
                    />

                    <Input
                      id="regEmail"
                      name="regEmail"
                      type="email"
                      label={localization?.checkout_email_label || "Email"}
                      inputClassName="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:border-primary"
                      className="w-full"
                      placeholder="you@example.com"
                      value={regEmail}
                      onChange={(e) => { setRegEmail(e.target.value); clearFieldError("regEmail"); }}
                      onBlur={() => {
                        const v = sanitize(regEmail);
                        if (v && !validateEmail(v)) {
                          setFieldErrors(prev => ({ ...prev, regEmail: "Please enter a valid email address." }));
                        }
                      }}
                      error={fieldErrors.regEmail}
                      required
                    />

                    <Input
                      id="regPassword"
                      name="regPassword"
                      type="password"
                      label={localization?.security_current_password || "Password"}
                      inputClassName="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:border-primary"
                      className="w-full"
                      placeholder="••••••••"
                      value={regPassword}
                      onChange={(e) => { setRegPassword(e.target.value); clearFieldError("regPassword"); }}
                      onBlur={() => {
                        if (regPassword && !validatePassword(regPassword)) {
                          setFieldErrors(prev => ({
                            ...prev,
                            regPassword: "Password must be at least 8 characters long and include a number and a special character."
                          }));
                        }
                      }}
                      error={fieldErrors.regPassword}
                      required
                    />

                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      label={localization?.security_confirm_password || "Confirm Password"}
                      inputClassName="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:border-primary"
                      className="w-full"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); clearFieldError("confirmPassword"); }}
                      error={fieldErrors.confirmPassword}
                      required
                    />

                    <div className="flex flex-col pt-1">
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 select-none cursor-pointer">
                          <Input
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) => { setAgreeTerms(e.target.checked); clearFieldError("agreeTerms"); }}
                            className="hidden"
                          />
                          <span
                            className={`
                              relative w-[46px] h-[26px] rounded-full transition-colors duration-200
                              ${agreeTerms ? "bg-accent/90" : "bg-primary/20"}
                            `}
                          >
                            <span
                              className={`
                                absolute top-[3px] left-[3px] w-5 h-5 rounded-full bg-white shadow-md
                                transition-transform duration-200
                                ${agreeTerms ? "translate-x-5" : "translate-x-0"}
                              `}
                            />
                          </span>
                        </label>
                        <span className="text-sm text-text">
                          {localization?.terms_conditions || "I agree to the Terms & Conditions"}
                        </span>
                      </div>
                      {fieldErrors.agreeTerms && (
                        <p className="text-error text-sm mt-1">{fieldErrors.agreeTerms}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      fullWidth
                      loading={loading}
                      loadingText="Creating account..."
                      className="mt-2 hover:bg-accent/90 cursor-pointer duration-300"
                    >
                      Sign up
                    </Button>

                    {/* OR divider and Google sign-up hidden
                    <div className="flex items-center gap-4 py-2">
                      <div className="h-px bg-divider flex-1" />
                      <div className="text-xs text-text/60">OR</div>
                      <div className="h-px bg-divider flex-1" />
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      fullWidth
                      className="border-divider! bg-surface-2/50! hover:bg-surface-2! flex items-center justify-center gap-2 cursor-pointer duration-300"
                    >
                      <span className="flex w-full h-full items-center justify-center rounded-md text-primary">
                        <FaGoogle className="mx-2" /> Continue with Google
                      </span>
                    </Button>
                    */}

                    <p className="text-center text-sm text-text pt-2">
                      {localization?.account_already || "Already have an account?"}{" "}
                      <Link
                        href={`/login${searchParams.get("redirect") ? `?redirect=${encodeURIComponent(searchParams.get("redirect"))}` : ""}`}
                        className="font-medium text-primary hover:underline"
                        onClick={(e) => { e.preventDefault(); toggleMode(); }}
                      >
                        {localization?.account_signin || "Sign in"}
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>

            {/* Sliding Image Panel */}
            <div
              className={`
                absolute top-0 bottom-0 w-1/2 hidden lg:block
                transition-all duration-700 ease-in-out
                ${isLogin ? "right-0" : "right-1/2"}
              `}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/new/login page copy.webp')" }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/55 to-black/75" />

              {/* Top brand */}
              <div
                className={`
                  absolute top-6 left-6 right-6 flex items-center
                  transition-all duration-700 ease-in-out
                  ${isLogin ? "justify-start" : "justify-end"}
                `}
              >
                <div className={`flex items-center gap-3 ${!isLogin ? "flex-row-reverse" : ""}`}>
                  <Link href="/">
                    <Image src="/images/new/logo-full.gif" alt={localization?.brandname || "Logo"} width={200} height={56} className="h-14 w-auto object-contain" />
                  </Link>
                  <div className={`leading-tight ${!isLogin ? "text-right" : ""}`}>
                    <div className="text-white font-semibold tracking-wide">{localization?.brandname || "Prolixus"}</div>
                    <div className="text-white/70 text-xs">{localization?.sign_in}</div>
                  </div>
                </div>
              </div>

              {/* Quote block */}
              <div className="absolute bottom-7 left-7 right-7">
                <div
                  className={`
                    text-white text-2xl font-semibold leading-snug font-accent
                    transition-all duration-700 ease-in-out
                    ${isLogin ? "text-left" : "text-right"}
                  `}
                >
                  {isLogin
                    ? (localization?.welcome_title || '"Simply the tools that my team and I need."')
                    : (localization?.join_users || '"Join thousands of users who trust Prolixus."')}
                </div>
                <div
                  className={`
                    mt-3 text-white/80 text-sm
                    transition-all duration-700 ease-in-out
                    ${isLogin ? "text-left" : "text-right"}
                  `}
                >
                  {isLogin
                    ? (localization?.team || "Prolixus User • Product Team")
                    : (localization?.community_growing || "Prolixus Community • Growing Together")}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </FaderInAnimation>
  );
}

