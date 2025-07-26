import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdAdd, MdEdit, MdDelete, MdDragHandle, MdSave, MdCancel, MdVisibility } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useGallery } from '../hooks/useGallery';
import { validateImageFile } from '../services/galleryApi';

const GalleryEditPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [draggedItem, setDraggedItem] = useState(null);
    const [showUploader, setShowUploader] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Use the Firebase gallery hook
    const { items, loading, error, addItem, updateItem, deleteItem, reorderItems } = useGallery();

    // Admin password from environment variable
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setPassword('');
        } else {
            alert('Incorrect password');
        }
    };

    const handleFileUpload = async (files) => {
        setUploading(true);
        let successCount = 0;

        for (const file of files) {
            const validation = validateImageFile(file);
            if (!validation.valid) {
                alert(validation.error);
                continue;
            }

            try {
                const result = await addItem({
                    title: file.name.split('.')[0],
                    category: 'Treatment',
                    description: 'New uploaded image'
                }, file);

                if (result.success) {
                    successCount++;
                } else {
                    alert(`Failed to upload ${file.name}: ${result.error}`);
                }
            } catch (error) {
                console.error('Upload error:', error);
                alert('Failed to upload ' + file.name + ': ' + error.message);
            }
        }

        setUploading(false);
        setShowUploader(false);

        if (successCount > 0) {
            alert(`Successfully uploaded ${successCount} image(s)`);
        } else {
            alert('No images were uploaded successfully');
        }
    };

    const handleDragStart = (e, item) => {
        setDraggedItem(item);
        e.dataTransfer.effectAllowed = 'move';
        e.target.style.opacity = '0.5';
    };

    const handleDragEnd = (e) => {
        e.target.style.opacity = '1';
        setDraggedItem(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = async (e, targetItem) => {
        e.preventDefault();
        if (!draggedItem || draggedItem.id === targetItem.id) return;

        const newItems = [...items];
        const draggedIndex = newItems.findIndex(item => item.id === draggedItem.id);
        const targetIndex = newItems.findIndex(item => item.id === targetItem.id);

        // Remove dragged item and insert at target position
        const [removed] = newItems.splice(draggedIndex, 1);
        newItems.splice(targetIndex, 0, removed);

        const result = await reorderItems(newItems);
        if (!result.success) {
            alert(`Failed to reorder items: ${result.error}`);
        }

        setDraggedItem(null);
    };

    const handleEdit = (item) => {
        setEditingItem({ ...item });
    };

    const handleSaveEdit = async () => {
        const result = await updateItem(editingItem.id, {
            title: editingItem.title,
            category: editingItem.category,
            description: editingItem.description
        });

        if (result.success) {
            setEditingItem(null);
        } else {
            alert(`Failed to update item: ${result.error}`);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            const result = await deleteItem(id);
            if (!result.success) {
                alert(`Failed to delete item: ${result.error}`);
            }
        }
    };

    if (!isAuthenticated) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f4f5f7'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        backgroundColor: 'white',
                        padding: '2rem',
                        borderRadius: '1rem',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        width: '100%',
                        maxWidth: '400px'
                    }}
                >
                    <h2 style={{
                        textAlign: 'center',
                        marginBottom: '1.5rem',
                        fontFamily: 'Unbounded, sans-serif',
                        color: '#2d2d2d'
                    }}>
                        Gallery Admin
                    </h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="Enter admin password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '2px solid #e0e0e0',
                                borderRadius: '0.5rem',
                                fontSize: '1rem',
                                marginBottom: '1rem',
                                fontFamily: 'Quicksand, sans-serif'
                            }}
                            required
                        />
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: '#2d2d2d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.5rem',
                                fontSize: '1rem',
                                fontFamily: 'Quicksand, sans-serif',
                                cursor: 'pointer'
                            }}
                        >
                            Login
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f4f5f7', padding: '2rem' }}>
            {/* Header */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                marginBottom: '2rem'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                    <h1 style={{
                        fontSize: '2rem',
                        fontFamily: 'Unbounded, sans-serif',
                        color: '#2d2d2d',
                        margin: 0
                    }}>
                        Gallery CMS
                    </h1>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link
                            to="/gallery"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.75rem 1rem',
                                backgroundColor: '#2d2d2d',
                                color: 'white',
                                textDecoration: 'none',
                                borderRadius: '0.5rem',
                                fontFamily: 'Quicksand, sans-serif'
                            }}
                        >
                            <MdVisibility /> View Gallery
                        </Link>
                        <button
                            onClick={() => setShowUploader(true)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.75rem 1rem',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                fontFamily: 'Quicksand, sans-serif'
                            }}
                        >
                            <MdAdd /> Add Images
                        </button>

                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {/* Loading State */}
                {loading && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '200px',
                        backgroundColor: 'white',
                        borderRadius: '1rem',
                        marginBottom: '1rem'
                    }}>
                        <p style={{ fontFamily: 'Quicksand, sans-serif', color: '#666' }}>
                            Loading gallery items...
                        </p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div style={{
                        backgroundColor: '#fee',
                        border: '1px solid #fcc',
                        borderRadius: '1rem',
                        padding: '1rem',
                        marginBottom: '1rem',
                        color: '#c33'
                    }}>
                        <p style={{ fontFamily: 'Quicksand, sans-serif', margin: 0 }}>
                            Error: {error}
                        </p>
                    </div>
                )}

                {/* Items Grid */}
                {!loading && (
                    <div style={{
                        display: 'grid',
                        gap: '1rem'
                    }}>
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                draggable
                                onDragStart={(e) => handleDragStart(e, item)}
                                onDragEnd={handleDragEnd}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, item)}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '1rem',
                                    padding: '1rem',
                                    boxShadow: draggedItem?.id === item.id
                                        ? '0 8px 16px rgba(0, 0, 0, 0.2)'
                                        : '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    cursor: draggedItem ? 'grabbing' : 'grab',
                                    border: draggedItem?.id === item.id ? '2px dashed #2196F3' : 'none',
                                    transform: draggedItem?.id === item.id ? 'rotate(2deg)' : 'none',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    alignItems: 'center'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '0.25rem'
                                    }}>
                                        <div style={{
                                            backgroundColor: '#2d2d2d',
                                            color: 'white',
                                            borderRadius: '50%',
                                            width: '24px',
                                            height: '24px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold'
                                        }}>
                                            {items.findIndex(i => i.id === item.id) + 1}
                                        </div>
                                        <MdDragHandle style={{ color: '#666', fontSize: '1.2rem' }} />
                                    </div>

                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            objectFit: 'cover',
                                            borderRadius: '0.5rem'
                                        }}
                                    />

                                    <div style={{ flex: 1 }}>
                                        {editingItem?.id === item.id ? (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                <input
                                                    value={editingItem.title}
                                                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                                                    style={{
                                                        padding: '0.5rem',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '0.25rem',
                                                        fontFamily: 'Quicksand, sans-serif'
                                                    }}
                                                />
                                                <select
                                                    value={editingItem.category}
                                                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                                                    style={{
                                                        padding: '0.5rem',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '0.25rem',
                                                        fontFamily: 'Quicksand, sans-serif'
                                                    }}
                                                >
                                                    <option value="Facility">Facility</option>
                                                    <option value="Treatment">Treatment</option>
                                                    <option value="Cosmetic">Cosmetic</option>
                                                    <option value="Emergency">Emergency</option>
                                                </select>
                                                <textarea
                                                    value={editingItem.description}
                                                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                                                    style={{
                                                        padding: '0.5rem',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '0.25rem',
                                                        fontFamily: 'Quicksand, sans-serif',
                                                        resize: 'vertical',
                                                        minHeight: '60px'
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <h3 style={{
                                                    margin: '0 0 0.25rem 0',
                                                    fontFamily: 'Quicksand, sans-serif',
                                                    color: '#2d2d2d'
                                                }}>
                                                    {item.title}
                                                </h3>
                                                <p style={{
                                                    margin: '0 0 0.25rem 0',
                                                    color: '#666',
                                                    fontSize: '0.9rem',
                                                    fontFamily: 'Quicksand, sans-serif'
                                                }}>
                                                    Category: {item.category}
                                                </p>
                                                <p style={{
                                                    margin: 0,
                                                    color: '#888',
                                                    fontSize: '0.85rem',
                                                    fontFamily: 'Quicksand, sans-serif'
                                                }}>
                                                    {item.description}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        {editingItem?.id === item.id ? (
                                            <>
                                                <button
                                                    onClick={handleSaveEdit}
                                                    style={{
                                                        padding: '0.5rem',
                                                        backgroundColor: '#4CAF50',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '0.25rem',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <MdSave />
                                                </button>
                                                <button
                                                    onClick={() => setEditingItem(null)}
                                                    style={{
                                                        padding: '0.5rem',
                                                        backgroundColor: '#666',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '0.25rem',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <MdCancel />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    style={{
                                                        padding: '0.5rem',
                                                        backgroundColor: '#2196F3',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '0.25rem',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <MdEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    style={{
                                                        padding: '0.5rem',
                                                        backgroundColor: '#f44336',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '0.25rem',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <MdDelete />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Upload Modal */}
            <AnimatePresence>
                {showUploader && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000
                        }}
                        onClick={() => setShowUploader(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '1rem',
                                padding: '2rem',
                                width: '90%',
                                maxWidth: '500px'
                            }}
                        >
                            <h3 style={{
                                margin: '0 0 1rem 0',
                                fontFamily: 'Unbounded, sans-serif',
                                color: '#2d2d2d'
                            }}>
                                Upload Images
                            </h3>

                            <div
                                style={{
                                    border: '2px dashed #ddd',
                                    borderRadius: '0.5rem',
                                    padding: '2rem',
                                    textAlign: 'center',
                                    marginBottom: '1rem'
                                }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    const files = Array.from(e.dataTransfer.files);
                                    handleFileUpload(files);
                                }}
                                onDragOver={(e) => e.preventDefault()}
                            >
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(Array.from(e.target.files))}
                                    style={{ display: 'none' }}
                                    id="file-upload"
                                />
                                <label
                                    htmlFor="file-upload"
                                    style={{
                                        cursor: 'pointer',
                                        fontFamily: 'Quicksand, sans-serif',
                                        color: '#666'
                                    }}
                                >
                                    {uploading ? 'Uploading...' : 'Click to select files or drag & drop here'}
                                </label>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                <button
                                    onClick={() => setShowUploader(false)}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        backgroundColor: '#666',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        fontFamily: 'Quicksand, sans-serif'
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GalleryEditPage;