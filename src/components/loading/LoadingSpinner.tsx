'use client'

import { motion } from 'framer-motion'

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="text-center">
        {/* Main Pulse Circle with Medical Cross */}
        <div className="relative flex items-center justify-center mb-8">
          {/* Outer pulsing rings */}
          <motion.div
            className="absolute w-32 h-32 rounded-full border-4 border-primary/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-24 h-24 rounded-full border-4 border-secondary/40"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.1, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          />
          
          {/* Main circle with medical cross */}
          <motion.div
            className="relative w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Medical Cross */}
            <div className="relative">
              <div className="w-6 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              <div className="w-2 h-6 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </motion.div>
        </div>

        {/* Animated DNA Helix */}
        <div className="relative w-20 h-16 mx-auto mb-6">
          <motion.div
            className="absolute left-0 w-2 h-2 bg-accent rounded-full"
            animate={{
              x: [0, 72, 0],
              y: [0, -8, 0, 8, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute right-0 w-2 h-2 bg-primary rounded-full"
            animate={{
              x: [0, -72, 0],
              y: [0, 8, 0, -8, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-accent via-primary to-secondary"
            animate={{
              scaleX: [0.5, 1, 0.5],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Loading Text with Typing Effect */}
        <div className="space-y-2">
          <motion.h2
            className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Family Homeo Clinic
          </motion.h2>
          
          <motion.div
            className="flex items-center justify-center space-x-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <span className="text-sm text-foreground/70">Loading</span>
            <motion.span
              className="flex space-x-1"
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="text-primary">.</span>
              <motion.span
                className="text-secondary"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              >
                .
              </motion.span>
              <motion.span
                className="text-accent"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              >
                .
              </motion.span>
            </motion.span>
          </motion.div>
          
          <motion.p
            className="text-xs text-foreground/50 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            Expert homeopathic care for your family
          </motion.p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-muted rounded-full mx-auto mt-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </div>
  )
}