"use client";

import { useForm, ValidationError } from "@formspree/react";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { Upload as UploadIcon, X as XIcon } from "lucide-react";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
    const [state, handleSubmit] = useForm("xnjebygl");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [filePreviewUrls, setFilePreviewUrls] = useState<string[]>([]);
    const [activeFile, setActiveFile] = useState<File | null>(null);
    const [activePreviewUrl, setActivePreviewUrl] = useState<string | null>(null);
    const [viewedFiles, setViewedFiles] = useState<string[]>([]);
    const hasSubmissionError = !state.submitting && !state.succeeded && Boolean(state.errors);

    const getFileId = (file: File) => `${file.name}-${file.size}-${file.lastModified}`;

    useEffect(() => {
        const urls = selectedFiles.map((file) => URL.createObjectURL(file));
        setFilePreviewUrls(urls);

        return () => {
            urls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [selectedFiles]);

    useEffect(() => {
        if (!activeFile) {
            setActivePreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(activeFile);
        setActivePreviewUrl(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [activeFile]);

    if (state.succeeded) {
        return (
            <div className={styles.success}>
                <p className={styles.successTitle}>Takk for meldingen.</p>
                <p className={styles.successText}>Vi har mottatt forespørselen din og tar kontakt så snart som mulig.</p>
            </div>
        );
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="name">
                    Navn
                </label>
                <input
                    className={styles.input}
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    inputMode="text"
                    pattern="[A-Za-zÀ-ÿÆØÅæøå'’ -]+"
                    placeholder="Kari Nordmann"
                    required
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} />
            </div>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="email">
                    E-post
                </label>
                <input className={styles.input} type="email" id="email" name="email" autoComplete="email" placeholder="kari-nordmann@gmail.com" required />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="phoneNumber">
                    Telefon nummer
                </label>
                <div className={styles.phoneRow}>
                    <input
                        className={styles.select}
                        id="phoneCountryCode"
                        name="phoneCountryCode"
                        autoComplete="tel-country-code"
                        defaultValue="+47"
                        inputMode="numeric"
                        pattern="\+?[0-9]{1,4}"
                        title="Skriv en gyldig landskode, for eksempel +47 eller +1."
                        placeholder="+47"
                        required
                    />
                    <input
                        className={styles.input}
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        autoComplete="tel"
                        inputMode="numeric"
                        pattern="[0-9()\s.-]+"
                        placeholder="123 45 678"
                        required
                    />
                </div>
                <ValidationError prefix="Phone number" field="phoneNumber" errors={state.errors} />
            </div>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="message">
                    Beskriv oppdraget
                </label>
                <textarea className={styles.textarea} id="message" name="message" rows={6} required />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="images">
                    Bilder
                </label>
                <input
                    className={styles.fileInput}
                    type="file"
                    id="images"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={(event) => {
                        const newFiles = Array.from(event.currentTarget.files ?? []);
                        setSelectedFiles((currentFiles) => [...currentFiles, ...newFiles]);
                        event.currentTarget.value = "";
                    }}
                />
                <label
                    htmlFor="images"
                    className={styles.fileButton}
                >
                    Velg bilder
                    <UploadIcon size={18} aria-hidden="true" />
                </label>
                {selectedFiles.length === 0 ? (
                    <p className={styles.helperText}>Valgfritt. Du kan legge ved ett eller flere bilder av oppdraget.</p>
                ) : null}
                {selectedFiles.length > 0 ? (
                    <div className={styles.fileSummary}>
                        <p className={styles.fileSummaryTitle}>
                            {selectedFiles.length === 1 ? "1 bilde valgt" : `${selectedFiles.length} bilder valgt`}
                        </p>
                        <ul className={styles.fileList}>
                            {selectedFiles.map((file, index) => (
                                <li key={`${file.name}-${index}`} className={styles.fileItem}>
                                    <button
                                        type="button"
                                        className={`${styles.fileLink} ${viewedFiles.includes(getFileId(file)) ? styles.fileLinkViewed : ""}`}
                                        onClick={() => {
                                            setActiveFile(file);
                                            setViewedFiles((currentFiles) =>
                                                currentFiles.includes(getFileId(file)) ? currentFiles : [...currentFiles, getFileId(file)]
                                            );
                                        }}
                                    >
                                        {filePreviewUrls[index] ? (
                                            <img className={styles.fileThumbnail} src={filePreviewUrls[index]} alt="" aria-hidden="true" />
                                        ) : null}
                                        {file.name}
                                    </button>
                                    <button
                                        type="button"
                                        className={styles.fileRemove}
                                        aria-label={`Fjern ${file.name}`}
                                        title={`Fjern ${file.name}`}
                                        onClick={() => {
                                            if (activeFile === file) {
                                                setActiveFile(null);
                                            }

                                            setSelectedFiles((currentFiles) =>
                                                currentFiles.filter((_, fileIndex) => fileIndex !== index)
                                            );
                                        }}
                                    >
                                        <XIcon size={16} aria-hidden="true" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null}
            </div>
            <div className={styles.actions}>
                <Button type="submit" buttonStyle="primary" className={styles.submitButton} disabled={state.submitting}>
                    {state.submitting ? "Sender..." : "Få gratis befaring"}
                </Button>
                <p className={styles.statusText} aria-live="polite">
                    {state.submitting
                        ? "Skjemaet sendes nå."
                        : state.succeeded
                            ? "Skjemaet ble sendt. Vi tar kontakt så snart som mulig."
                            : hasSubmissionError
                                ? "Skjemaet ble ikke sendt. Sjekk feltene og prøv igjen."
                                : ""}
                </p>
            </div>

            {activePreviewUrl ? (
                <div className={styles.previewOverlay} role="dialog" aria-modal="true" aria-label="Bildforhåndsvisning" onClick={() => setActiveFile(null)}>
                    <div className={styles.previewDialog} onClick={(event) => event.stopPropagation()}>
                        <button type="button" className={styles.previewClose} onClick={() => setActiveFile(null)}>
                            Lukk
                        </button>
                        <img className={styles.previewModalImage} src={activePreviewUrl} alt={activeFile?.name ?? "Valgt bilde"} />
                        <p className={styles.previewCaption}>{activeFile?.name}</p>
                    </div>
                </div>
            ) : null}
        </form>
    );
}
