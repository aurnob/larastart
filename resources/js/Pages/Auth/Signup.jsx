import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle2 } from 'lucide-react'

function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [agreedToTerms, setAgreedToTerms] = useState(false)
    const [passwordsMatch, setPasswordsMatch] = useState(true)

    const passwordStrength = (password) => {
        if (password.length === 0) return 0
        let strength = 0
        if (password.length > 7) strength += 25
        if (password.match(/[a-z]/)) strength += 25
        if (password.match(/[A-Z]/)) strength += 25
        if (password.match(/[0-9]/)) strength += 25
        return strength
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Check if passwords match
        if (password !== confirmPassword) {
            setPasswordsMatch(false)
            return
        }

        // If passwords match, reset the error and proceed
        setPasswordsMatch(true)

        // Send the form data to your backend
        console.log('Form submitted', { name, email, password, agreedToTerms })
    }

    return (
        <div className="max-w-md w-full mx-auto space-y-6 p-8 bg-white rounded-xl shadow-lg">
            <div className="text-center space-y-2">
                <div className="flex justify-center">
                    <svg
                        className="w-20 h-20 text-primary"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold">Sign Up</h1>
                <p className="text-muted-foreground">Create your account to get started</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Progress value={passwordStrength(password)} className="w-full" />
                    <div className="flex items-center space-x-2 text-sm">
                        {passwordStrength(password) === 100 ? (
                            <CheckCircle2 className="text-green-500" size={16} />
                        ) : (
                            <AlertCircle className="text-yellow-500" size={16} />
                        )}
                        <span className="text-muted-foreground">{passwordStrength(password) === 100 ? 'Strong password' : 'Password should be at least 8 characters with uppercase, lowercase, and numbers'}</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {!passwordsMatch && (
                        <p className="text-red-500 text-sm">Passwords do not match.</p>
                    )}
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="terms"
                        checked={agreedToTerms}
                        onCheckedChange={() => setAgreedToTerms(!agreedToTerms)}
                    />
                    <label
                        htmlFor="terms"
                        className="text-sm text-muted-foreground cursor-pointer"
                    >
                        I agree to the Terms of Service and Privacy Policy
                    </label>
                </div>
                <Button type="submit" className="w-full" disabled={!agreedToTerms}>
                    Create Account
                </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground">
                Already have an account? <a href="#" className="text-primary hover:underline">Log in</a>
            </p>
        </div>
    )
}

export default Signup
