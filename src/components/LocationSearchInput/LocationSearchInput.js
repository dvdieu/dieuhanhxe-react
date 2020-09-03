import React from 'react';
//lib
import PlacesAutocomplete from 'react-places-autocomplete';
import classnames from 'classnames';
//antd
import { Input, Spin } from 'antd';
//styles
import styles from './styles.module.scss';

const LocationSearchInput = ({ placeholder, address, onChange, onSelect }) => {
    return (
        <PlacesAutocomplete
            value={address}
            onChange={onChange}
            onSelect={onSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div className={classnames('full-width')}>
                    <Input
                        {...getInputProps({
                            placeholder,
                        })}
                    />
                    <div className={styles["autocomplete-dropdown-container"]}>
                        {loading && <div className={styles.loading}> <Spin /></div>}
                        {suggestions.map((suggestion, key) => {
                            const className = classnames({
                                [styles['suggestion-item']]: true,
                                [styles.active]: suggestion.active,
                                [styles.inactive]: !suggestion.active,
                            })
                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                    })}
                                    key={key}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    )
}

export default LocationSearchInput;