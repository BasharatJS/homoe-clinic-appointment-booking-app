'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  LogOut, 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Phone, 
  Mail, 
  MessageSquare,
  Filter,
  Search,
  MoreVertical,
  Stethoscope,
  Activity,
  TrendingUp,
  Bell,
  RefreshCw,
  Trash2,
  CheckCircle2,
  X
} from 'lucide-react'
import { logoutDoctor, getAppointments, updateAppointmentStatus, getAppointmentStats, deleteAppointment, Appointment, AuthorizedDoctor } from '@/lib/firebaseServices'

interface DoctorDashboardProps {
  user: any
  doctorData: AuthorizedDoctor
}

export default function DoctorDashboard({ user, doctorData }: DoctorDashboardProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([])
  const [stats, setStats] = useState({ total: 0, pending: 0, accepted: 0, cancelled: 0, completed: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'cancelled' | 'completed'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(Date.now())
  const [pullDistance, setPullDistance] = useState(0)
  const [isPulling, setIsPulling] = useState(false)
  const [startY, setStartY] = useState(0)

  useEffect(() => {
    loadDashboardData()
    
    // Auto refresh every 30 seconds
    const interval = setInterval(() => {
      loadDashboardData(true) // Silent refresh
    }, 30000)
    
    return () => clearInterval(interval)
  }, [])
  
  // Pull to refresh functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY)
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY
    const distance = currentY - startY
    
    if (distance > 0 && window.scrollY === 0) {
      setIsPulling(true)
      setPullDistance(Math.min(distance, 100))
    }
  }
  
  const handleTouchEnd = () => {
    if (isPulling && pullDistance > 50) {
      loadDashboardData()
    }
    setIsPulling(false)
    setPullDistance(0)
  }

  useEffect(() => {
    filterAppointments()
  }, [appointments, filter, searchQuery, dateFilter])

  const loadDashboardData = async (silent = false) => {
    try {
      if (!silent) {
        setIsLoading(true)
      } else {
        setIsRefreshing(true)
      }
      
      const [appointmentsData, statsData] = await Promise.all([
        getAppointments(),
        getAppointmentStats()
      ])
      
      setAppointments(appointmentsData)
      setStats(statsData)
      setLastRefresh(Date.now())
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      if (!silent) {
        setIsLoading(false)
      } else {
        setIsRefreshing(false)
      }
    }
  }

  const filterAppointments = () => {
    let filtered = appointments

    if (filter !== 'all') {
      filtered = filtered.filter(apt => apt.status === filter)
    }

    if (searchQuery) {
      filtered = filtered.filter(apt => 
        apt.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.mobile.includes(searchQuery) ||
        apt.service.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (dateFilter) {
      filtered = filtered.filter(apt => apt.date === dateFilter)
    }

    setFilteredAppointments(filtered)
  }

  const clearAllFilters = () => {
    setFilter('all')
    setSearchQuery('')
    setDateFilter('')
  }

  const handleStatusUpdate = async (appointmentId: string, newStatus: 'accepted' | 'cancelled' | 'completed') => {
    try {
      setActionLoading(appointmentId)
      await updateAppointmentStatus(appointmentId, newStatus)
      
      // Update local state
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, status: newStatus }
            : apt
        )
      )

      // Refresh stats
      const newStats = await getAppointmentStats()
      setStats(newStats)
      
      setSelectedAppointment(null)
    } catch (error) {
      console.error('Error updating appointment status:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeleteAppointment = async (appointmentId: string) => {
    try {
      setActionLoading(appointmentId)
      await deleteAppointment(appointmentId)
      
      // Update local state
      setAppointments(prev => prev.filter(apt => apt.id !== appointmentId))
      
      // Refresh stats
      const newStats = await getAppointmentStats()
      setStats(newStats)
      
      setSelectedAppointment(null)
    } catch (error) {
      console.error('Error deleting appointment:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const handleLogout = async () => {
    try {
      await logoutDoctor()
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'accepted': return 'text-green-600 bg-green-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      case 'completed': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />
      case 'accepted': return <CheckCircle className="w-4 h-4" />
      case 'cancelled': return <XCircle className="w-4 h-4" />
      case 'completed': return <CheckCircle2 className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-white text-lg">Loading Dashboard...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen bg-background"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg shadow-purple-900/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Stethoscope className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-white">Doctor Dashboard</h1>
                <p className="text-white/80">Welcome back, {doctorData.name}</p>
                {isRefreshing && (
                  <motion.p 
                    className="text-white/60 text-xs flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                    Updating...
                  </motion.p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Refresh Button */}
              <motion.button
                onClick={() => loadDashboardData()}
                disabled={isRefreshing}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Refresh Dashboard"
              >
                <motion.div
                  animate={isRefreshing ? { rotate: 360 } : {}}
                  transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: "linear" }}
                >
                  <RefreshCw className="w-5 h-5" />
                </motion.div>
              </motion.button>
              
              {/* Notification Bell */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <Bell className="w-6 h-6 text-white cursor-pointer" />
                {stats.pending > 0 && (
                  <motion.span 
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={stats.pending}
                  >
                    {stats.pending}
                  </motion.span>
                )}
              </motion.div>

              <motion.button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Pull to refresh indicator */}
      {isPulling && (
        <motion.div
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-30 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ transform: `translateX(-50%) translateY(${pullDistance - 50}px)` }}
        >
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">
              {pullDistance > 50 ? 'Release to refresh' : 'Pull to refresh'}
            </span>
          </div>
        </motion.div>
      )}
      
      <div className="pt-34 px-6 py-6 overflow-y-auto">
        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, staggerChildren: 0.1 }}
        >
          {[
            { label: 'Total Appointments', value: stats.total, icon: Calendar, color: 'from-purple-500 to-purple-600' },
            { label: 'Pending', value: stats.pending, icon: Clock, color: 'from-yellow-500 to-yellow-600' },
            { label: 'Accepted', value: stats.accepted, icon: CheckCircle, color: 'from-green-500 to-green-600' },
            { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'from-blue-500 to-blue-600' },
            { label: 'Cancelled', value: stats.cancelled, icon: XCircle, color: 'from-red-500 to-red-600' }
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                className={`bg-gradient-to-r ${stat.color} rounded-2xl p-6 text-white shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">{stat.label}</p>
                    <motion.p
                      className="text-3xl font-bold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 300 }}
                    >
                      {stat.value}
                    </motion.p>
                  </div>
                  <Icon className="w-8 h-8 text-white/80" />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          className="bg-background border border-border rounded-2xl shadow-lg p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="space-y-4">
            {/* Status Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-foreground/60" />
                <span className="text-sm font-medium text-foreground/80">Status:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['all', 'pending', 'accepted', 'completed', 'cancelled'].map((status) => (
                  <motion.button
                    key={status}
                    onClick={() => setFilter(status as any)}
                    className={`px-3 py-1.5 rounded-lg font-medium capitalize transition-colors text-sm ${
                      filter === status
                        ? 'bg-purple-600 text-white'
                        : 'bg-muted text-foreground/60 hover:bg-border'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {status === 'all' ? 'All' : status}
                  </motion.button>
                ))}
              </div>
            </div>
            
            {/* Search and Date Filters */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input
                  type="text"
                  placeholder="Search appointments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
              </div>
              
              {/* Date Filter */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all w-full md:w-48"
                  placeholder="Filter by date"
                />
              </div>
              
              {/* Clear Filters Button */}
              {(filter !== 'all' || searchQuery || dateFilter) && (
                <motion.button
                  onClick={clearAllFilters}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-4 h-4" />
                  <span>Clear Filters</span>
                </motion.button>
              )}
            </div>
            
            {/* Active Filters Display */}
            {(filter !== 'all' || searchQuery || dateFilter) && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-foreground/60">Active filters:</span>
                {filter !== 'all' && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                    Status: {filter}
                  </span>
                )}
                {searchQuery && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Search: "{searchQuery}"
                  </span>
                )}
                {dateFilter && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Date: {new Date(dateFilter).toLocaleDateString()}
                  </span>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Appointments List */}
        <motion.div
          className="bg-background border border-border rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="p-6 border-b border-border bg-muted/50">
            <h2 className="text-xl font-semibold text-foreground">
              Appointments ({filteredAppointments.length})
            </h2>
          </div>

          <div className="divide-y divide-border">
            <AnimatePresence>
              {filteredAppointments.length === 0 ? (
                <motion.div
                  className="p-12 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Calendar className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
                  <p className="text-foreground/60 text-lg">No appointments found</p>
                  <p className="text-foreground/40 text-sm">Try adjusting your filters</p>
                </motion.div>
              ) : (
                filteredAppointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    className="p-6 hover:bg-muted/50 transition-colors cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    onClick={() => setSelectedAppointment(appointment)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-foreground text-lg">
                            {appointment.fullName}
                          </h3>
                          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {getStatusIcon(appointment.status)}
                            <span className="capitalize">{appointment.status}</span>
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-foreground/60">
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4" />
                            <span>{appointment.mobile}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Mail className="w-4 h-4" />
                            <span>{appointment.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Activity className="w-4 h-4" />
                            <span>{appointment.service}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-foreground/60">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(appointment.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                      </div>
                      <motion.button
                        className="p-2 rounded-lg hover:bg-border transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <MoreVertical className="w-5 h-5 text-foreground/40" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Appointment Detail Modal */}
      <AnimatePresence>
        {selectedAppointment && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAppointment(null)}
          >
            <motion.div
              className="bg-background rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-foreground">Appointment Details</h3>
                  <motion.button
                    onClick={() => setSelectedAppointment(null)}
                    className="p-2 rounded-full bg-muted hover:bg-border transition-colors"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <XCircle className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Patient Info */}
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">Patient Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <Users className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-foreground/60">Full Name</p>
                        <p className="font-medium">{selectedAppointment.fullName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-foreground/60">Mobile</p>
                        <p className="font-medium">{selectedAppointment.mobile}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg md:col-span-2">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-foreground/60">Email</p>
                        <p className="font-medium">{selectedAppointment.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Appointment Info */}
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">Appointment Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <Activity className="w-5 h-5 text-secondary" />
                      <div>
                        <p className="text-sm text-foreground/60">Service</p>
                        <p className="font-medium">{selectedAppointment.service}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <Calendar className="w-5 h-5 text-secondary" />
                      <div>
                        <p className="text-sm text-foreground/60">Date</p>
                        <p className="font-medium">{formatDate(selectedAppointment.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <Clock className="w-5 h-5 text-secondary" />
                      <div>
                        <p className="text-sm text-foreground/60">Time</p>
                        <p className="font-medium">{selectedAppointment.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <span className={`w-5 h-5 rounded-full ${getStatusColor(selectedAppointment.status)} flex items-center justify-center`}>
                        {getStatusIcon(selectedAppointment.status)}
                      </span>
                      <div>
                        <p className="text-sm text-foreground/60">Status</p>
                        <p className="font-medium capitalize">{selectedAppointment.status}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                {selectedAppointment.message && (
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Additional Message</h4>
                    <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-accent mt-1" />
                      <p className="text-foreground/80">{selectedAppointment.message}</p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col space-y-4 pt-4">
                  {/* Status Update Buttons */}
                  {selectedAppointment.status === 'pending' && (
                    <div className="flex space-x-4">
                      <motion.button
                        onClick={() => handleStatusUpdate(selectedAppointment.id!, 'accepted')}
                        disabled={actionLoading === selectedAppointment.id}
                        className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>{actionLoading === selectedAppointment.id ? 'Accepting...' : 'Accept'}</span>
                      </motion.button>
                      <motion.button
                        onClick={() => handleStatusUpdate(selectedAppointment.id!, 'cancelled')}
                        disabled={actionLoading === selectedAppointment.id}
                        className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <XCircle className="w-5 h-5" />
                        <span>{actionLoading === selectedAppointment.id ? 'Cancelling...' : 'Cancel'}</span>
                      </motion.button>
                    </div>
                  )}
                  
                  {/* Mark as Completed Button (for accepted appointments) */}
                  {selectedAppointment.status === 'accepted' && (
                    <motion.button
                      onClick={() => handleStatusUpdate(selectedAppointment.id!, 'completed')}
                      disabled={actionLoading === selectedAppointment.id}
                      className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span>{actionLoading === selectedAppointment.id ? 'Marking Complete...' : 'Mark as Completed'}</span>
                    </motion.button>
                  )}
                  
                  {/* Delete Button */}
                  <motion.button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this appointment? This action cannot be undone.'))
                        handleDeleteAppointment(selectedAppointment.id!)
                    }}
                    disabled={actionLoading === selectedAppointment.id}
                    className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 border-2 border-red-600"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Trash2 className="w-5 h-5" />
                    <span>{actionLoading === selectedAppointment.id ? 'Deleting...' : 'Delete Appointment'}</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}