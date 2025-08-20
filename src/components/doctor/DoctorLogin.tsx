'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, Stethoscope, AlertCircle, Shield } from 'lucide-react'
import { loginDoctor } from '@/lib/firebaseServices'

interface DoctorLoginProps {
  onLoginSuccess: (doctorData: any) => void
}

export default function DoctorLogin({ onLoginSuccess }: DoctorLoginProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await loginDoctor(formData.email, formData.password)
      onLoginSuccess(result)
    } catch (error: any) {
      console.error('Login error:', error)
      setError(error.message || 'Failed to login. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 300
      }
    }
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 py-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-violet-500/20 to-purple-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <motion.div
        className="w-full max-w-md relative z-10 my-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div
          className="text-center mb-6 sm:mb-8"
          variants={itemVariants}
        >
          {/* <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-purple-500/30 backdrop-blur-sm rounded-2xl mb-4 border border-purple-400/50"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Stethoscope className="w-10 h-10 text-white" />
          </motion.div> */}
          
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Doctor Login Portal
          </h1>
          <p className="text-white/80 text-base sm:text-lg">
          Access your appointment dashboard
          </p>
          {/* <p className="text-white/60 text-xs sm:text-sm mt-2">
            Secure access for authorized practitioners
          </p> */}
        </motion.div>

        {/* Login Form */}
        <motion.div
          className="bg-purple-900/30 backdrop-blur-xl rounded-3xl border border-purple-500/30 shadow-2xl shadow-purple-900/20 p-6 sm:p-8 mb-4"
          variants={formVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-white font-medium mb-2 text-sm">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300/80" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="doctor@example.com"
                  className="w-full pl-12 pr-4 py-3 sm:py-4 bg-purple-800/20 border border-purple-400/30 rounded-xl text-white placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-400/60 focus:border-purple-400/70 transition-all duration-300"
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-white font-medium mb-2 text-sm">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300/80" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 sm:py-4 bg-purple-800/20 border border-purple-400/30 rounded-xl text-white placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-400/60 focus:border-purple-400/70 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300/80 hover:text-purple-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center p-3 bg-red-500/20 border border-red-400/40 rounded-xl backdrop-blur-sm"
              >
                <AlertCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" />
                <span className="text-red-200 text-sm">{error}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 sm:py-4 px-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 hover:from-purple-500 hover:to-purple-600 hover:shadow-lg hover:shadow-purple-500/25 relative overflow-hidden border border-purple-500/50"
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                {/* Button Background Animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-violet-400/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                
                {isLoading ? (
                  <div className="flex items-center justify-center relative z-10">
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Signing In...
                  </div>
                ) : (
                  <span className="relative z-10">Access Dashboard</span>
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* Security Notice */}
          <motion.div
            variants={itemVariants}
            className="mt-4 sm:mt-6 text-center"
          >
            <p className="text-white/60 text-xs flex items-center justify-center gap-2">
              🔒
              This portal is secured for authorized medical practitioners only
            </p>
          </motion.div>
        </motion.div>

        {/* Footer */}
        {/* <motion.div
          className="text-center mt-6"
          variants={itemVariants}
        >
          <p className="text-white/60 text-sm">
            � 2024 Family Homeo Clinic. All rights reserved.
          </p>
        </motion.div> */}
      </motion.div>
    </div>
  )
}