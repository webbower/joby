'use client';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { Modals } from '~/feat/Modals/mod';
import { selectIsModalVisible } from '~/feat/State/mod.selectors';
import { AppState } from '~/feat/State/mod';

import { Home } from '~/screens/Home/Home';
import { closeModal, showModal } from '~/feat/State/mod.actions';

const mapStateToProps = (state: AppState) => ({
	productDetailsModalIsVisible: selectIsModalVisible(Modals.ProductDetail)(state),
});

const mapDispatchToProps = {
	showModal,
	closeModal,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Home);
