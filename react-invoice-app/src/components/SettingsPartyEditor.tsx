import type { Party } from '../domain/types';

interface SettingsPartyEditorProps {
    party: Party;
    onChange: (party: Party) => void;
}