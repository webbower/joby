import { LoadingText, Modal, Stack } from '~/ui/Layout/mod';
import { ModalProps } from '~/ui/Layout/Modal/Modal';
import { Button } from '~/ui/Actions/mod';
import { formatDate } from '~/lib/date/mod';

import { type ProductOrder } from '../data/ProductOrder';
import { PriorityChip } from './PriorityChip';

import css from './ProductOrderDetailsModal.module.scss';
import clsx from 'clsx';

export type ProductOrderDetailsModalProps = {
	productOrder: ProductOrder | null;
	isVisible?: ModalProps['isVisible'];
	loading?: boolean;
	onClose: ModalProps['onClose'];
};

export const ProductOrderDetailsModal = ({
	productOrder,
	isVisible,
	loading = false,
	onClose,
}: ProductOrderDetailsModalProps) => (
	<Modal isVisible={isVisible} title={productOrder?.title ?? ''} onClose={onClose}>
		<div className={clsx(css.root, { [css.loading]: loading })}>
			{loading || !productOrder ? (
				<LoadingText center color="dark" />
			) : (
				<>
					<section className={css.orderDetailsSection}>
						<h3 className={css.sectionTitle}>Order Details</h3>

						<ul className={css.orderDetails}>
							<li>
								<h4 className={css.orderDetailsTitle}>Part</h4>
								<p>{productOrder.part}</p>
							</li>
							<li>
								<h4 className={css.orderDetailsTitle}>Part number</h4>
								<p>{productOrder.partNumber}</p>
							</li>
							<li>
								<h4 className={css.orderDetailsTitle}>Release status</h4>
								<p>{productOrder.releaseStatus}</p>
							</li>
							<li>
								<h4 className={css.orderDetailsTitle}>Drawing number</h4>
								<p>{productOrder.drawingNumber}</p>
							</li>
							<li>
								<h4 className={css.orderDetailsTitle}>Flight article</h4>
								<p>{productOrder.flightArticle}</p>
							</li>
							<li>
								<h4 className={css.orderDetailsTitle}>Estimated shipping date</h4>
								<p>{formatDate(productOrder.estimatedShippingDate)}</p>
							</li>
							<li>
								<h4 className={css.orderDetailsTitle}>Priority</h4>
								<PriorityChip priority={productOrder.priority} size="md" />
							</li>
						</ul>
					</section>

					<section className={css.processDetailsSection}>
						<h3 className={css.sectionTitle}>Process Details</h3>

						<ul className={css.processDetails}>
							<li>
								<h4 className={css.processDetailsTitle}>Material:</h4>
								<p>{productOrder.material}</p>
							</li>
							<li>
								<h4 className={css.processDetailsTitle}>Material Stock Size:</h4>
								<p>{productOrder.materialStockSize}</p>
							</li>
							<li>
								<h4 className={css.processDetailsTitle}>Surface Treatment:</h4>
								<p>{productOrder.surfaceTreatment}</p>
							</li>
							<li>
								<h4 className={css.processDetailsTitle}>Machine:</h4>
								<p>{productOrder.machine}</p>
							</li>
						</ul>
					</section>

					<section className={css.filesSection}>
						<h3 className={css.sectionTitle}>Files</h3>

						<aside className={css.filesFilters}>
							<h4 className={css.fileFiltersTitle}>Select a Department:</h4>

							<Stack as="menu" className={css.fileFiltersOptions}>
								<li>
									<Button variant="primary">Process Engineering</Button>
								</li>
								<li>
									<Button variant="primary" pressed>
										Quality
									</Button>
								</li>
								<li>
									<Button variant="primary">Programming</Button>
								</li>
								<li>
									<Button variant="primary">Surface Treatment</Button>
								</li>
							</Stack>
						</aside>

						<div className={css.filesList}>
							{[
								{ title: 'File A' },
								{ title: 'File B' },
								{ title: 'File C' },
								{ title: 'File E' },
							].map(file => (
								<article key={file.title} className={css.fileEntry}>
									<div className={css.fileImage}>
										<img
											src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
											alt=""
											className={css.fileEntryThumbnail}
										/>
									</div>

									<ul className={css.fileInfo}>
										<li className={css.fileInfoName}>
											<h4 className={css.fileInfoTitle}>Name</h4>
											<p>Name Text</p>
										</li>

										<li className={css.fileInfoDate}>
											<h4 className={css.fileInfoTitle}>Date</h4>
											<p>{formatDate(new Date())}</p>
										</li>

										<li className={css.fileInfoDesc}>
											<h4 className={css.fileInfoTitle}>File Description</h4>
											<p>
												This is just an awesome file and this area is actually the file description.
												Since there is no file here right now, I am just making up this text.
												Congrats. You have just wasted 15 seconds of your day reading this.
											</p>
										</li>
									</ul>
								</article>
							))}
						</div>
					</section>
				</>
			)}
		</div>
	</Modal>
);
