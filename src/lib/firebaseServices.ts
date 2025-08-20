import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  Timestamp 
} from 'firebase/firestore'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { db, auth } from './firebase'

// Types
export interface Appointment {
  id?: string
  fullName: string
  mobile: string
  email: string
  service: string
  date: string
  time: string
  message?: string
  status: 'pending' | 'accepted' | 'cancelled' | 'completed'
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface AuthorizedDoctor {
  id: string
  email: string
  name: string
  isActive: boolean
}

// Appointments Services
export const addAppointment = async (appointmentData: Omit<Appointment, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'appointments'), {
      ...appointmentData,
      status: 'pending',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding appointment:', error)
    throw error
  }
}

export const getAppointments = async () => {
  try {
    const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    const appointments: Appointment[] = []
    
    querySnapshot.forEach((doc) => {
      appointments.push({
        id: doc.id,
        ...doc.data()
      } as Appointment)
    })
    
    return appointments
  } catch (error) {
    console.error('Error getting appointments:', error)
    throw error
  }
}

export const updateAppointmentStatus = async (appointmentId: string, status: 'pending' | 'accepted' | 'cancelled' | 'completed') => {
  try {
    const appointmentRef = doc(db, 'appointments', appointmentId)
    await updateDoc(appointmentRef, {
      status,
      updatedAt: Timestamp.now()
    })
  } catch (error) {
    console.error('Error updating appointment status:', error)
    throw error
  }
}

export const deleteAppointment = async (appointmentId: string) => {
  try {
    await deleteDoc(doc(db, 'appointments', appointmentId))
  } catch (error) {
    console.error('Error deleting appointment:', error)
    throw error
  }
}

// Doctor Authentication Services
export const checkAuthorizedDoctor = async (email: string) => {
  try {
    const q = query(
      collection(db, 'authorized_doctors'), 
      where('email', '==', email),
      where('isActive', '==', true)
    )
    const querySnapshot = await getDocs(q)
    
    if (!querySnapshot.empty) {
      const doctorData = querySnapshot.docs[0].data()
      return {
        id: querySnapshot.docs[0].id,
        ...doctorData
      } as AuthorizedDoctor
    }
    
    return null
  } catch (error) {
    console.error('Error checking authorized doctor:', error)
    throw error
  }
}

export const loginDoctor = async (email: string, password: string) => {
  try {
    // First check if doctor is authorized
    const authorizedDoctor = await checkAuthorizedDoctor(email)
    
    if (!authorizedDoctor) {
      throw new Error('You are not authorized to access the doctor dashboard')
    }

    // If authorized, sign in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return {
      user: userCredential.user,
      doctorData: authorizedDoctor
    }
  } catch (error: any) {
    console.error('Error signing in doctor:', error)
    throw new Error(error.message || 'Failed to sign in')
  }
}

export const logoutDoctor = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

// Statistics Services
export const getAppointmentStats = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'appointments'))
    let pending = 0
    let accepted = 0
    let cancelled = 0
    let completed = 0
    let total = 0

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      total++
      switch (data.status) {
        case 'pending':
          pending++
          break
        case 'accepted':
          accepted++
          break
        case 'cancelled':
          cancelled++
          break
        case 'completed':
          completed++
          break
      }
    })

    return { total, pending, accepted, cancelled, completed }
  } catch (error) {
    console.error('Error getting appointment stats:', error)
    throw error
  }
}